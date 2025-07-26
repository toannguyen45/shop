"use server";

import { createSessionCookie, deleteSessionCookie } from "@/lib/session";
import { createSessionInDb, deleteSessionFromDb } from "@/lib/session-db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/db/prisma";
import bcrypt from "bcrypt";
import { LoginSchema } from "@/schemaValidations/auth.schema";
import { z } from "zod";

export async function logout() {
  const session = await getSession();
  if (session?.sessionToken) {
    await deleteSessionFromDb(session.sessionToken);
  }
  await deleteSessionCookie();
  redirect("/login");
}

export async function login(data: z.infer<typeof LoginSchema>) {
  const { email, password } = data;

  if (!email || !password) {
    return { message: "Email và mật khẩu là bắt buộc." };
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return { message: "Email hoặc mật khẩu không đúng." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { message: "Email hoặc mật khẩu không đúng." };
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionToken = crypto.randomUUID();

  // Create session in DB
  await createSessionInDb(sessionToken, user.id, expiresAt);

  // Create session cookie
  await createSessionCookie(sessionToken, expiresAt);

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
