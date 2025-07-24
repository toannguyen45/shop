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
    <>
      <Input
        type="number"
        min={1}
        value={value}
        className="w-14 text-center px-1 py-0 h-8"
        onChange={(e) => setValue(Number(e.target.value))}
        onBlur={handleBlur}
        disabled={isPending}
      />
      <div className="text-xs text-red-500 mt-1">
        {`Chỉ còn lại ${stock} sản phẩm`}
      </div>
    </>
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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Đơn giá</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Thành tiền</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items.map((item: CartItem) => (
            <TableRow key={item.productId}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.slug}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(item.price)}₫</TableCell>
              <TableCell>
                <QuantityControl item={item} stock={item.stock} />
              </TableCell>
              <TableCell>{formatCurrency(item.price * item.qty)}₫</TableCell>
              <TableCell>
                <RemoveButton productId={item.productId} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
