"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { CartItem } from "@/types/cart";
import prisma from "@/db/prisma";
import {
  cartItemSchema,
  insertCartSchema,
} from "@/schemaValidations/cart.schema";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { getSessionWithUser } from "@/lib/session-db";

// Chỉ đọc sessionCartId, không tạo mới
async function getSessionCartId() {
  const cookieStore = await cookies();
  return cookieStore.get("sessionCartId")?.value;
}

// Tạo sessionCartId nếu chưa có (chỉ dùng trong server action)
async function createSessionCartIdIfNotExists() {
  const cookieStore = await cookies();
  let sessionCartId = cookieStore.get("sessionCartId")?.value;
  if (!sessionCartId) {
    sessionCartId = crypto.randomUUID();
    cookieStore.set("sessionCartId", sessionCartId, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 ngày
    });
  }
  return sessionCartId;
}

// Calculate cart prices (trả về number)
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  // Lấy giá trị từ env, nếu không có thì mặc định 0
  const SHIPPING_PRICE = process.env.SHIPPING_PRICE
    ? Number(process.env.SHIPPING_PRICE)
    : 0;
  const TAX_RATE = process.env.TAX_RATE ? Number(process.env.TAX_RATE) : 0;

  const shippingPrice = round2(itemsPrice > 100 ? 0 : SHIPPING_PRICE);
  const taxPrice = round2(TAX_RATE * itemsPrice);
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // Lấy hoặc tạo sessionCartId (được phép set cookie trong server action)
    const sessionCartId = await createSessionCartIdIfNotExists();

    // Lấy userId nếu có
    const sessionWithUser = await getSessionWithUser();
    const userId = sessionWithUser?.user?.id;

    // Get cart
    const cart = await getMyCart();

    // Parse and validate item
    const item = cartItemSchema.parse(data);

    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error("Sản phẩm không tồn tại");

    if (!cart) {
      // Create new cart object
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // Add to database
      await prisma.cart.create({
        data: newCart,
      });

      // Revalidate product page
      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} đã được thêm vào giỏ hàng`,
      };
    } else {
      // Check if item is already in cart
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        // Check stock
        if (product.stock < existItem.qty + 1) {
          throw new Error("Không đủ hàng trong kho");
        }

        // Increase the quantity
        (cart.items as CartItem[]).find(
          (x) => x.productId === item.productId
        )!.qty = existItem.qty + 1;
      } else {
        // If item does not exist in cart
        // Check stock
        if (product.stock < 1) throw new Error("Không đủ hàng trong kho");

        // Add item to the cart.items
        cart.items.push(item);
      }

      // Save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items as Prisma.InputJsonValue[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "đã được cập nhật trong" : "đã được thêm vào"
        } giỏ hàng`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  // Chỉ đọc sessionCartId, không tạo mới
  const sessionCartId = await getSessionCartId();

  // Lấy userId nếu có
  const sessionWithUser = await getSessionWithUser();
  const userId = sessionWithUser?.user?.id;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert decimals and return
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: Number(cart.itemsPrice),
    totalPrice: Number(cart.totalPrice),
    shippingPrice: Number(cart.shippingPrice),
    taxPrice: Number(cart.taxPrice),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // Lấy hoặc tạo sessionCartId (được phép set cookie trong server action)
    await createSessionCartIdIfNotExists();

    // Lấy userId nếu có
    await getSessionWithUser();

    // Get Product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("Sản phẩm không tồn tại");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Giỏ hàng không tồn tại");

    // Check for item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Sản phẩm không tồn tại trong giỏ hàng");

    // Check if only one in qty
    if (exist.qty === 1) {
      // Remove from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease qty
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.InputJsonValue[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} đã được xóa khỏi giỏ hàng`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

export async function deleteItemFromCart(productId: string) {
  // Lấy cart hiện tại
  const cart = await getMyCart();
  if (!cart) throw new Error("Giỏ hàng không tồn tại");

  // Kiểm tra sản phẩm có tồn tại không
  const product = await prisma.product.findFirst({
    where: { id: productId },
  });
  if (!product) throw new Error("Sản phẩm không tồn tại");

  // Kiểm tra item có trong cart không
  const exist = (cart.items as CartItem[]).find(
    (x) => x.productId === productId
  );
  if (!exist) throw new Error("Sản phẩm không tồn tại trong giỏ hàng");

  // Xóa toàn bộ sản phẩm này khỏi cart.items
  cart.items = (cart.items as CartItem[]).filter(
    (x) => x.productId !== productId
  );

  // Update cart trong database
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.InputJsonValue[],
      ...calcPrice(cart.items as CartItem[]),
    },
  });

  // Revalidate trang sản phẩm
  revalidatePath(`/products/${product.slug}`);

  return {
    success: true,
    message: `${product.name} đã được xóa khỏi giỏ hàng`,
  };
}
