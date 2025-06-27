import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllBlogsCached } from "@/actions/blog.action";
import Link from "next/link";
import Image from "next/image";

interface BlogsPageProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
    sort?: string;
    sortDirection?: string;
    filter?: string;
    limit?: string;
  }>;
}

const BlogList = async ({ searchParams }: BlogsPageProps) => {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const searchText = params.query || "";
  const sort = params.sort || "";
  const sortDirection = (params.sortDirection as "asc" | "desc") || "desc";
  const filter = params.filter || "";
  const limit = Number(params.limit) || 10;

  // Convert filter to boolean for isFeatured
  const isFeatured =
    filter === "true" ? true : filter === "false" ? false : undefined;

  const blogsPromise = await getAllBlogsCached({
    query: searchText,
    page,
    sort,
    sortDirection,
    isFeatured,
    limit,
  });

  // Await both in parallel (if you have more async work, add here)
  const [blogs] = await Promise.all([blogsPromise]);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {blogs.data.map((blog) => (
        <Link href={`/blogs/${blog.slug}`} key={blog.id}>
          <Card className="shadow-none py-0 h-full flex flex-col">
            <CardHeader className="p-2">
              {blog.image ? (
                <Image
                  decoding="sync"
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={225}
                  quality={65}
                  className="aspect-video bg-muted rounded-lg w-full object-cover"
                  style={{ width: "100%", height: "auto" }}
                />
              ) : (
                <div className="aspect-video bg-muted rounded-lg w-full" />
              )}
            </CardHeader>
            <CardContent className="pt-4 pb-5">
              {blog.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="rounded-full mr-1">
                  {tag}
                </Badge>
              ))}

              <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight">
                {blog.title}
              </h3>

              <p className="mt-2 text-muted-foreground">{blog.summary}</p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {blog.author?.image ? (
                    <Image
                      src={blog.author.image}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover bg-muted"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-muted" />
                  )}
                  <span className="text-muted-foreground font-semibold">
                    {blog.author?.name || "Unknown"}
                  </span>
                </div>

                <span className="text-muted-foreground text-sm">
                  {formatDate(blog.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
