import Categories from "@/components/client/categories";
import ContactForm from "@/components/client/contact-form";
import ReadyToWear from "@/components/client/ready-to-wear";
import { Features } from "@/components/client/features";
import Carousel from "@/components/client/carousel";

export const metadata = {
  description: "Chào mừng đến với trang chủ MiTo3D",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <Carousel />
      <Categories />
      <ReadyToWear />
      {/* <FeaturedCollection /> */}
      <Features />
      <ContactForm />
    </>
  );
}
