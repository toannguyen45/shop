import ConfirmDialog from "@/components/admin/confirm-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Product } from "@/types/product";
import { AlertTriangleIcon } from "lucide-react";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: Product;
  onDelete: (id: string) => Promise<{ success: boolean; message: string }>;
}

const ProductsDeleteDialog = ({
  open,
  onOpenChange,
  currentRow,
  onDelete,
}: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const res = await onDelete(currentRow.id);
      if (!res.success) {
        setError(res.message);
        toast.error(res.message);
      } else {
        toast.success(res.message);
        onOpenChange(false);
      }
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={isPending}
      title={
        <span className="text-destructive flex items-center">
          <AlertTriangleIcon
            className="stroke-destructive mr-1 inline-block"
            size={18}
          />
          Xóa sản phẩm
        </span>
      }
      desc={
        <div className="space-y-4">
          <p>
            Bạn có chắc chắn muốn xóa sản phẩm{" "}
            <span className="font-bold">{currentRow.name}</span> không?
            <br />
            Hành động này không thể hoàn tác.
          </p>
          <Alert variant="destructive">
            <AlertTitle>Cảnh báo!</AlertTitle>
            <AlertDescription>
              Hành động này sẽ xóa vĩnh viễn sản phẩm khỏi hệ thống.
            </AlertDescription>
          </Alert>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      }
      confirmText={isPending ? "Đang xóa..." : "Xóa"}
      destructive
    />
  );
};

export default ProductsDeleteDialog;
