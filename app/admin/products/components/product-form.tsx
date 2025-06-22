"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import slugify from "slugify";
import { insertProductSchema } from "@/schemaValidations/product.schema";
import { productDefaultValues } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/actions/product.action";
import { UploadButton } from "@/lib/uploadthing";
import { Product } from "@/types/product";

const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof insertProductSchema>>({
    resolver: zodResolver(insertProductSchema),
    defaultValues:
      product && type === 'Update' ? product : productDefaultValues,
  });

  const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
    values
  ) => {
    // On Create
    if (type === 'Create') {
      const res = await createProduct(values);

      if (!res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        router.push('/admin/products');
      }
    }

    // On Update
    if (type === 'Update') {
      if (!productId) {
        router.push('/admin/products');
        return;
      }

      const res = await updateProduct({ ...values, id: productId });

      if (!res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
        router.push('/admin/products');
      }
    }
  };

  const images = form.watch("images");
  const isFeatured = form.watch("isFeatured");
  const banner = form.watch("banner");

  return (
    <Form {...form}>
      <form
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "name"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Tiêu đề</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Nhập tiêu đề..." {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "slug"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Slug</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter slug" {...field} />
                    <Button
                      type="button"
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 mt-2"
                      onClick={() => {
                        form.setValue(
                          "slug",
                          slugify(form.getValues("name"), { lower: true })
                        );
                      }}
                    >
                      Tạo
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "category"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Danh mục</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Brand */}
        <FormField
          control={form.control}
          name="brand"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "brand"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Hãng</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Enter brand" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "price"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Giá</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "stock"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Stock</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Input placeholder="Enter stock" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Images</FormLabel>
              <div className="flex-1">
                <Card>
                  <CardContent className="space-y-2 mt-2 min-h-48">
                    <div className="flex-start space-x-2">
                      {images.map((image: string) => (
                        <Image
                          key={image}
                          src={image}
                          alt="product image"
                          className="w-20 h-20 object-cover object-center rounded-sm"
                          width={100}
                          height={100}
                        />
                      ))}
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: { url: string }[]) => {
                            form.setValue("images", [...images, res[0].url]);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(`ERROR! ${error.message}`);
                          }}
                        />
                      </FormControl>
                    </div>
                  </CardContent>
                </Card>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {/* Featured Product */}
        <FormItem className="w-full flex items-center gap-4">
          <FormLabel className="w-24">Featured</FormLabel>
          <div className="flex-1">
            <Card>
              <CardContent className="space-y-2 mt-2">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="space-x-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Is Featured?</FormLabel>
                    </FormItem>
                  )}
                />
                {isFeatured && banner && (
                  <Image
                    src={banner}
                    alt="banner image"
                    className="w-full object-cover object-center rounded-sm"
                    width={1920}
                    height={680}
                  />
                )}

                {isFeatured && !banner && (
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: { url: string }[]) => {
                      form.setValue("banner", res[0].url);
                    }}
                    onUploadError={(error: Error) => {
                      toast.error(`ERROR! ${error.message}`);
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </FormItem>
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof insertProductSchema>,
              "description"
            >;
          }) => (
            <FormItem className="w-full flex items-center gap-4">
              <FormLabel className="w-24">Description</FormLabel>
              <div className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Enter product description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Đang chạy' : `${type} Product`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
