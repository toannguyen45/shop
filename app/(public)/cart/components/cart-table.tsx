"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Cart, CartItem } from "@/types/cart";
import React, { useTransition } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
} from "@/actions/cart.actions";

type CartTableProps = { cart?: Cart };

function RemoveButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();
  const handleRemove = () => {
    startTransition(async () => {
      const res = await deleteItemFromCart(productId);
      if (res.success) toast.success(res.message);
      else toast.error(res.message);
    });
  };
  return (
    <Button
      size="icon"
      variant="destructive"
      onClick={handleRemove}
      disabled={isPending}
    >
      <Trash />
    </Button>
  );
}

function QuantityControl({ item, stock }: { item: CartItem; stock: number }) {
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = React.useState(item.qty);

  React.useEffect(() => {
    setValue(item.qty);
  }, [item.qty]);

  const handleBlur = () => {
    if (value < 1 || value === item.qty) return;
    if (value > stock) {
      toast.error(`Chỉ còn lại ${stock} sản phẩm trong kho.`);
      setValue(item.qty); // Reset về số lượng cũ
      return;
    }
    startTransition(async () => {
      if (value > item.qty) {
        await addItemToCart({
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          qty: value - item.qty,
          image: item.image,
          price: item.price,
          stock: stock,
        });
      } else if (value < item.qty) {
        for (let i = 0; i < item.qty - value; i++) {
          await removeItemFromCart(item.productId);
        }
      }
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Input
        type="number"
        min={1}
        value={value}
        className="w-14 text-center px-1 py-0 h-8"
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleBlur}
        disabled={isPending}
      />
      <div className="text-xs text-red-500 text-center">
        {`Chỉ còn lại ${stock} sản phẩm`}
      </div>
    </div>
  );
}

// Mobile Card Component
function CartItemCard({ item, formatCurrency }: { item: CartItem; formatCurrency: (value: number) => string }) {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white">
      <div className="flex items-start gap-3">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="rounded object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.name}</h3>
          <div className="text-sm text-gray-600 mb-2">
            Đơn giá: {formatCurrency(item.price)}₫
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm">Số lượng:</span>
              <QuantityControl item={item} stock={item.stock} />
            </div>
            <RemoveButton productId={item.productId} />
          </div>
          <div className="text-sm font-medium text-right">
            Thành tiền: {formatCurrency(item.price * item.qty)}₫
          </div>
        </div>
      </div>
    </div>
  );
}

const CartTable = ({ cart }: CartTableProps) => {
  function formatCurrency(value: number) {
    return value.toLocaleString("vi-VN");
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-lg">
        Giỏ hàng của bạn đang trống.
        <div className="mt-6">
          <Link href="/products">
            <Button>Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile Layout - Card View */}
      <div className="block md:hidden">
        {cart.items.map((item: CartItem) => (
          <CartItemCard key={item.productId} item={item} formatCurrency={formatCurrency} />
        ))}
      </div>

      {/* Desktop Layout - Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Sản phẩm</TableHead>
              <TableHead className="w-[15%] text-center">Đơn giá</TableHead>
              <TableHead className="w-[20%] text-center">Số lượng</TableHead>
              <TableHead className="w-[15%] text-center">Thành tiền</TableHead>
              <TableHead className="w-[10%] text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.items.map((item: CartItem) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover flex-shrink-0"
                    />
                    <div className="font-medium min-w-0">
                      <div className="truncate">{item.name}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">{formatCurrency(item.price)}₫</TableCell>
                <TableCell className="text-center">
                  <QuantityControl item={item} stock={item.stock} />
                </TableCell>
                <TableCell className="text-center">{formatCurrency(item.price * item.qty)}₫</TableCell>
                <TableCell className="text-center">
                  <RemoveButton productId={item.productId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary Section */}
      <div className="max-w-md ml-auto mt-8 border rounded p-6 bg-gray-50">
        <div className="flex justify-between py-1">
          <span>Tạm tính:</span>
          <span>{formatCurrency(cart.itemsPrice)}₫</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Phí vận chuyển:</span>
          <span>{formatCurrency(cart.shippingPrice)}₫</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Thuế:</span>
          <span>{formatCurrency(cart.taxPrice)}₫</span>
        </div>
        <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
          <span>Tổng cộng:</span>
          <span>{formatCurrency(cart.totalPrice)}₫</span>
        </div>
        <Button className="w-full mt-4">Thanh toán</Button>
      </div>
    </div>
  );
};

export default CartTable;
