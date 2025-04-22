import Carousel from "@/components/custom/carousel";
import Header from "@/components/custom/header";

export default function Home() {
  return (
    <>
      <Header />
      <Carousel />
      <div className="category py-14">
        <div className="flex justify-between items-center px-10">
          <h2 className="uppercase text-5xl">READY-TO-WEAR</h2>
          <p>see more</p>
        </div>
        <div className="products grid grid-cols-4 px-10 py-10">
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
          <div className="product h-[300px] border border-amber-500"></div>
        </div>
      </div>
    </>
  );
}
