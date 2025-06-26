// import Hero from "@/components/client/hero";
import Carousel from "@/components/client/carousel";
import Categories from "@/components/custom/categories";
import ContactForm from "@/components/client/contact-form";
import FeaturedCollection from "@/components/custom/featured-collection";
import ReadyToWear from "@/components/client/ready-to-wear";
import { Features } from "@/components/client/features";

export default function Home() {
  return (
    <>
      <Carousel />
      {/* <Hero /> */}
      <Categories />
      <ReadyToWear />
      {/* <FeaturedCollection /> */}
      <Features />
      <ContactForm />
    </>
  );
}
