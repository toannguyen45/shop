import Image from "next/image";
import Link from "next/link";

const categoryItems = [
  {
    id: 1,
    title: "WOMEN",
    image: "/imgs/categories/women.webp",
    href: "/products",
  },
  {
    id: 2,
    title: "MEN",
    image: "/imgs/categories/men.webp",
    href: "/products",
  },
  {
    id: 3,
    title: "ACCESSORIES",
    image: "/imgs/categories/accessories.webp",
    href: "/products",
  },
];

const Categories = () => {
  return (
    <section className="max-w-screen-xl mx-auto py-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryItems.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[16/9] group overflow-hidden"
          >
            <Image
              src={item.image}
              alt={`${item.title} Collection`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/40">
              <h3 className="text-white text-2xl font-light">{item.title}</h3>
            </div>
            <Link
              href={item.href}
              className="absolute inset-0"
              aria-label={`View ${item.title} Collection`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
