import { getBlogBySlug } from "@/actions/blog.action";
import PageBanner from "@/components/client/page-banner";
import ReadingProgress from "@/components/custom/reading-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/db/prisma";
import { User } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import slugify from "slugify";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const blogs = await prisma.blog.findMany({
    select: { slug: true },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blog = await getBlogBySlug(slug);

    if (!blog) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    return {
      title: blog.title,
      description: blog.summary,
      keywords: blog.tags.join(", "),
      authors: [{ name: blog.author.name }],
      openGraph: {
        title: blog.title,
        description: blog.content,
        type: "article",
        authors: [blog.author.name],
        images: [
          {
            url: blog.image ?? "",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.content,
        images: blog.image ? [blog.image] : [],
      },
      alternates: {
        canonical: `/blogs/${slug}`,
      },
    };
  } catch {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

const page = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Tin Tức", href: "/blogs" },
    { label: blog.title, href: `/blogs/${blog.slug}` },
  ];

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <ReadingProgress />
      <PageBanner title="Tin Tức" breadcrumbs={breadcrumbs} />

      <div className="max-w-screen-xl mx-auto py-10 px-4 flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-6 gap-4">
            <span>{formatDate(blog.createdAt)}</span>
            <span>
              <User size="20" />
            </span>
            <span>{blog.author?.name}</span>
          </div>
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 space-y-5">
          {/* Search input */}
          <Card>
            <CardHeader>
              <CardTitle className="uppercase">Tìm kiếm tin tức</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                placeholder="Tìm kiếm blog..."
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="uppercase">Tags</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {blog.tags?.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blogs/${slugify(tag, {
                    lower: true,
                    strict: true,
                  })}`}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {tag}
                </Link>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
};

export default page;
