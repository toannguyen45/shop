// components/custom/FeaturedCollection.tsx
import Image from "next/image";
import Link from "next/link";

const FeaturedCollection = () => {
  return (
    <section className="relative h-[600px] md:h-screen">
      <Image
        src="/imgs/featured-collection.webp"
        alt="Summer Collection 2024"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
        <div className="text-center text-white">
          <h2 className="text-5xl md:text-7xl font-medium mb-6">
            SUMMER COLLECTION
          </h2>
          <Link
            href="/collections/summer"
            className="inline-block border border-white px-8 py-3 hover:bg-white hover:text-black transition-colors"
          >
            DISCOVER MORE
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
