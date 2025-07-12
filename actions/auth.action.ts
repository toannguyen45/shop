"use server";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/db/prisma";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/schemaValidations/auth.schema";
import { z } from "zod";

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function login(data: z.infer<typeof LoginSchema>) {
  // 1. Lấy email và password từ form
  const { email, password } = data;

  // 2. Kiểm tra dữ liệu đầu vào
  if (!email || !password) {
    return { message: "Email và mật khẩu là bắt buộc." };
  }

  // 3. Tìm user trong database
  const user = await prisma.user.findUnique({
    where: { email },
  });

  console.log(user, email, password);
  if (!user || !user.password) {
    return { message: "Email hoặc mật khẩu không đúng." };
  }

  // 4. So sánh mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { message: "Email hoặc mật khẩu không đúng." };
  }

  // 5. Tạo session JWT và lưu vào cookie
  await createSession(user.id);

  // 6. Chuyển hướng về dashboard
  // redirect("/admin/dashboard");
  return {
    success: true,
    message: "login successfully",
  };
}

export async function register(data: z.infer<typeof LoginSchema>) {
  const { email, password } = data;

  // 1. Kiểm tra dữ liệu đầu vào
  if (!email || !password) {
    return { message: "Email và mật khẩu là bắt buộc." };
  }

  // 2. Kiểm tra xem user đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return { message: "Email đã được đăng ký." };
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Tạo user mới
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // 5. (Tùy chọn) Có thể tạo session hoặc redirect ở đây

  return {
    success: true,
    message: "Đăng ký thành công!",
    user: {
      id: newUser.id,
      email: newUser.email,
    },
  };
}
