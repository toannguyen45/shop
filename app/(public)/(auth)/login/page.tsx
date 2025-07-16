import React from "react";
import LoginForm from "./login-form";
import PageBanner from "@/components/client/page-banner";

const Login = () => {
  const breadcrumbs = [{ label: "Đăng Nhập" }];

  return (
    <>
      <PageBanner title="Đăng Nhập" breadcrumbs={breadcrumbs} />

      <div className="max-w-screen-xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center">
          <LoginForm type="Login" />
        </div>
      </div>
    </>
  );
};

export default Login;
