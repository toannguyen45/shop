import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/admin/page-header";
import ProductForm from "../components/product-form";

const CreateProduct = () => {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader>Tạo Sản Phẩm</PageHeader>

      <Card>
        <CardHeader className="border-b-2">
          <CardTitle className="mb-2">Thông Tin</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm type='Create'/>
        </CardContent>
      </Card>

    </div>
  );
};

export default CreateProduct;
