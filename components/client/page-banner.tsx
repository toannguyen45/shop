import {
  Breadcrumb,
  BreadcrumbItem as UIBreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface PageBannerProps {
  title: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function PageBanner({
  title,
  breadcrumbs = [],
}: PageBannerProps) {
  return (
    <div className="w-full bg-muted/30 border-b mb-5">
      <div className="container mx-auto py-8 md:py-12">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          {/* Page Title */}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                <UIBreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      <span className="hidden sm:inline">Trang Chủ</span>
                    </Link>
                  </BreadcrumbLink>
                </UIBreadcrumbItem>
                {breadcrumbs.map((item, index) => (
                  <UIBreadcrumbItem key={index}>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                    {item.href && index < breadcrumbs.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </UIBreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </div>
    </div>
  );
}
