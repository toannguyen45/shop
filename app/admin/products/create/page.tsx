import React from "react";
import ProductForm from "../components/product-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateProduct = () => {
  return (
    <>
      <h2 className="h2-bold">Tạo Sản Phẩm</h2>
      <div className="my-8">
        <Card>
          <CardHeader className="border-b-2">
            <CardTitle className="mb-2">Thông Tin</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductForm />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CreateProduct;
