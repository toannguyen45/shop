import Carousel from "@/components/custom/carousel";
import Categories from "@/components/custom/categories";
import ContactForm from "@/components/custom/contact-form";
import FeaturedCollection from "@/components/custom/featured-collection";
import InstagramFeed from "@/components/custom/instagram-feed";
import NewArrivals from "@/components/custom/new-arrrivals";
import ReadyToWear from "@/components/custom/ready-to-wear";

export default function Home() {
  return (
    <>
      <Carousel />
      <ReadyToWear/>
      {/* <NewArrivals /> */}
      <Categories />
      <FeaturedCollection />
      {/* <InstagramFeed /> */}
      <ContactForm />
    </>
  );
}
