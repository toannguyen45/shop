import { getProductBySlug } from '@/actions/product.action';
import { notFound } from 'next/navigation';
import React from 'react'

const ProductDetail = async (props: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await props.params;

    const product = await getProductBySlug(slug);

    if (!product) notFound();

    return (
        <div>page</div>
    )
}

export default ProductDetail