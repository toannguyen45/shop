import Image from "next/image";
import Link from "next/link";
import MainNav from "./main-nav";
import Menu from "@/components/admin/menu";
import { APP_NAME } from "@/constants";
import { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard MiTo3D",
  description: "Admin MiTo3D",
  robots: {
    follow: false,
    index: false,
  },
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check admin role thay vì chỉ check session
  await requireAdmin();

  return (
    <>
      <div className="flex flex-col">
        <div className="border-b container mx-auto">
          <div className="flex items-center h-16 px-4">
            <Link href="/" className="w-22">
              <Image
                src="/imgs/logo.svg"
                height={48}
                width={48}
                alt={APP_NAME}
              />
            </Link>
            <MainNav className="mx-6" />
            <div className="ml-auto items-center flex space-x-4">
              <Menu />
            </div>
          </div>
        </div>

        <div className="flex-1 container mx-auto my-10 px-4">{children}</div>
      </div>
    </>
  );
}
