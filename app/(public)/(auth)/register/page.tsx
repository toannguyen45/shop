import React from "react";
import PageBanner from "@/components/client/page-banner";
import LoginForm from "../login/login-form";

const Login = () => {
  const breadcrumbs = [{ label: "Đăng Ký" }];

  return (
    <>
      <PageBanner title="Đăng Ký" breadcrumbs={breadcrumbs} />

      <div className="max-w-screen-xl mx-auto py-10 px-4">
        <div className="flex items-center justify-center">
          <LoginForm type="Register" />
        </div>
      </div>
    </>
  );
};

export default Login;
