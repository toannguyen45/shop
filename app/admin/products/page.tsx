import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteDialog from "@/components/admin/delete-dialog";
import Pagination from "@/components/admin/pagination";
import { deleteProduct, getAllProducts } from "@/actions/product.action";
import PageHeader from "@/components/admin/page-header";
import Image from "next/image";
import { Product } from "@/types/product";

// import { requireAdmin } from '@/lib/auth-guard';

const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  // await requireAdmin();

  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  console.log(products);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <PageHeader>Sản Phẩm</PageHeader>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Thêm Sản Phẩm +</Link>
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ảnh</TableHead>
            <TableHead>Tiêu Đề</TableHead>
            <TableHead className="text-right">Giá</TableHead>
            <TableHead>Danh Mục</TableHead>
            <TableHead>Tồn Kho</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  alt="image-product"
                  width={100}
                  height={100}
                  src={product.images[0]}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-right">
                {formatPrice(product.price)}
              </TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={page}
        totalPages={products.pagination.totalPages}
        hasNextPage={products.pagination.hasNextPage}
        hasPrevPage={products.pagination.hasPrevPage}
        baseUrl="/admin/products"
        searchParams={{
          ...(searchText && { query: searchText }),
          ...(category && { category }),
        }}
      />
    </div>
  );
};

export default AdminProductsPage;
