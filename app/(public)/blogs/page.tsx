import PageBanner from "@/components/client/page-banner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Metadata } from "next";
import { Suspense } from "react";
import BlogList from "./components/blog-list";

export const metadata: Metadata = {
  title: "Tin Tức | Các Tin tức",
  description:
    "Discover our latest blog posts, tutorials, and insights. Stay updated with the latest trends and tips.",
  keywords: "blog, articles, tutorials, insights, technology",
  openGraph: {
    title: "Blog Posts | Your Blog Site",
    description: "Discover our latest blog posts, tutorials, and insights.",
    type: "website",
    url: "/blogs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog Posts | Your Blog Site",
    description: "Discover our latest blog posts, tutorials, and insights.",
  },
};

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

const Blog01Page = (props: BlogsPageProps) => {
  const breadcrumbs = [{ label: "Tin Tức" }];

  return (
    <>
      <PageBanner title="Tin Tức" breadcrumbs={breadcrumbs} />

      <div className="max-w-screen-xl mx-auto py-4 px-4">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Suspense fallback={<div>Đang tải...</div>}>
          <BlogList searchParams={props.searchParams} />
        </Suspense>
      </div>
    </>
  );
};

export default Blog01Page;
