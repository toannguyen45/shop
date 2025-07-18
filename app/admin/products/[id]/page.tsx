import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import { getProductById } from "@/actions/product.action";
import PageHeader from "@/components/admin/page-header";
import MyForm from "../components/form";

const UpdateProduct = async (props: {
    params: Promise<{
        id: string;
    }>;
}) => {
    const { id } = await props.params;

    const product = await getProductById(id);

    if (!product) return notFound();

    return (
        <div className="flex flex-col gap-5">
            <PageHeader>Cập Nhật Sản Phẩm</PageHeader>

            <Card>
                <CardHeader className="border-b-2">
                    <CardTitle className="mb-2">Thông Tin</CardTitle>
                </CardHeader>
                <CardContent>
                    <MyForm type='Update' product={product} productId={product.id} />
                </CardContent>
            </Card>

        </div>
    );
};

export default UpdateProduct;
