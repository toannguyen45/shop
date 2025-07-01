import Footer from "@/components/client/footer";
import Header from "@/components/client/header/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </>
  );
}
