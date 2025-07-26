import { baseUrl } from "@/lib/utils";
import { MetadataRoute } from "next";
import { getAllProducts } from "@/actions/product.actions";
import prisma from "@/db/prisma";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  //   validateEnvironmentVariables();

  // Static routes - các trang tĩnh quan trọng
  const staticRoutes = [
    "",
    "/products",
    "/blogs",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Get all products for sitemap
  const productsPromise = getAllProducts({
    query: "",
    page: 1,
    limit: 1000, // Get all products for sitemap
  }).then((result) =>
    result.data.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified:
        product.updatedAt?.toISOString() || new Date().toISOString(),
    }))
  );

  // Get all published blogs for sitemap
  const blogsPromise = prisma.blog
    .findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    })
    .then((blogs) =>
      blogs.map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt.toISOString(),
      }))
    );

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (await Promise.all([productsPromise, blogsPromise])).flat();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Fallback to static routes only if there's an error
    return staticRoutes;
  }

  return [...staticRoutes, ...fetchedRoutes];
}
