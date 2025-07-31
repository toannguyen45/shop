import Footer from "@/components/client/footer";
import Header from "@/components/client/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trang chủ MiTo3D",
  description: "Chào mừng các bạn đến với MiTo3D",
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  );
}
