import PageBanner from "@/components/client/page-banner";
import { Separator } from "@/components/ui/separator";
import { verifySession } from "@/lib/dal";
import React from "react";

const page = async () => {
  const { user } = await verifySession();

  return (
    <>
      <PageBanner
        title="Trang khách hàng"
        breadcrumbs={[{ label: "Trang khách hàng" }]}
      />
      <section className="max-w-screen-xl mx-auto py-4 px-4">
        {/* Tiêu đề ngang hàng */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-center mb-2">
          <h2 className="text-lg font-semibold">TRANG TÀI KHOẢN</h2>
          <h2 className="text-lg font-semibold">THÔNG TIN TÀI KHOẢN</h2>
        </div>
        {/* Nội dung ngang hàng */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Left menu */}
          <div>
            <div className="mb-3">
              <span className="font-semibold">Xin chào, </span>
              <span className="text-red-500 font-medium">
                {String(user?.name || "Chưa có tên")}
              </span>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="text-black font-medium">Thông tin tài khoản</li>
              <li className="text-gray-500 hover:text-black transition cursor-pointer">
                Đơn hàng của bạn
              </li>
              <li className="text-gray-500 hover:text-black transition cursor-pointer">
                Đổi mật khẩu
              </li>
              <li className="text-gray-500 hover:text-black transition cursor-pointer">
                Số địa chỉ (0)
              </li>
            </ul>
          </div>
          {/* Right info */}
          <div className="flex flex-col justify-center">
            <Separator className="mb-4 md:mb-4" />
            <div className="mb-2">
              <span className="font-semibold">Họ tên: </span>
              <span> {String(user?.name || "Chưa có tên")}</span>
            </div>
            <div>
              <span className="font-semibold">Email: </span>
              <span> {String(user?.email || "Chưa có email")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
