import PageBanner from "@/components/client/page-banner";
import React from "react";
import {
  getMyCart,
} from "@/actions/cart.actions";

import CartTable from "./components/cart-table";

const CartPage = async () => {
  const breadcrumbs = [{ label: "Giỏ Hàng" }];
  const cart = await getMyCart();
  console.log(cart);
  return (
    <>
      <PageBanner title="Giỏ Hàng" breadcrumbs={breadcrumbs} />
      <section className="max-w-screen-xl mx-auto py-10 px-4">
        <CartTable cart={cart} />
      </section>
    </>
  );
};

export default CartPage;
