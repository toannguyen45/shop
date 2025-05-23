// components/custom/InstagramFeed.tsx
import Image from "next/image";
import Link from "next/link";
import { Instagram } from "lucide-react";

const instagramPosts = [
  {
    id: 1,
    image: "/imgs/instagram/post1.webp",
    likes: 234,
    comments: 12,
    link: "https://instagram.com/p/post1",
  },
  {
    id: 2,
    image: "/imgs/instagram/post2.webp",
    likes: 187,
    comments: 8,
    link: "https://instagram.com/p/post2",
  },
  {
    id: 3,
    image: "/imgs/instagram/post3.webp",
    likes: 342,
    comments: 15,
    link: "https://instagram.com/p/post3",
  },
  {
    id: 4,
    image: "/imgs/instagram/post4.webp",
    likes: 276,
    comments: 21,
    link: "https://instagram.com/p/post4",
  },
  {
    id: 5,
    image: "/imgs/instagram/post5.webp",
    likes: 198,
    comments: 9,
    link: "https://instagram.com/p/post5",
  },
  {
    id: 6,
    image: "/imgs/instagram/post6.webp",
    likes: 265,
    comments: 18,
    link: "https://instagram.com/p/post6",
  },
];

const InstagramFeed = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          FOLLOW US ON INSTAGRAM
        </h2>
        <Link
          href="https://instagram.com/yourshop"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <Instagram className="w-5 h-5 mr-2" />
          <span>@YOURSHOP</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {instagramPosts.map((post) => (
          <Link
            key={post.id}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={post.image}
              alt={`Instagram post ${post.id}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-sm flex items-center space-x-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="https://instagram.com/yourshop"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 border border-black hover:bg-black hover:text-white transition-colors"
        >
          VIEW MORE ON INSTAGRAM
        </Link>
      </div>
    </section>
  );
};

export default InstagramFeed;
