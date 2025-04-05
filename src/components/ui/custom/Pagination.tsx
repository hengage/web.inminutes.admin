import {
  Pagination as PrimitivePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useUrlState from "@/hooks/useUrlState";
import { cn } from "@/lib/utils";
import { IPagination } from "@/types";
import { UrlObject } from "url";

export function Pagination({
  total,
  limit,
  page,
  classname,
}: Omit<Omit<IPagination, "data">, "totalPages"> & { classname?: string }) {
  const totalPages = Math.ceil(total / limit);
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    // Show all pages if they fit
    pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    pages.push(1, 2); // Always include first two pages

    if (page > 4) pages.push("..."); // Left ellipsis if needed

    // Middle pages (2 before and 2 after the current page)
    for (let i = Math.max(3, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) pages.push("..."); // Right ellipsis if needed

    pages.push(totalPages - 1, totalPages); // Always include last two pages
  }
  const { allParams, pathname } = useUrlState();

  const getPageLink = (page: number): UrlObject => ({
    pathname,
    query: { ...allParams, page },
  });
  return (
    <PrimitivePagination>
      <PaginationContent className={cn("flex justify-center w-full", classname)}>
        <PaginationItem className="">
          <PaginationPrevious
            href={getPageLink(page - 1)}
            disabled={page === 1}
            className="border"
          />
        </PaginationItem>
        <div className="hidden md:flex">
          {pages.map((currentPage, index) => (
            <PaginationItem key={index}>
              {currentPage === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink href={getPageLink(currentPage)} isActive={currentPage === page}>
                  {currentPage}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>
        <div className="md:hidden">
          Page {page} of {totalPages}
        </div>
        <PaginationItem>
          <PaginationNext
            href={getPageLink(page + 1)}
            disabled={page === totalPages}
            className="border"
          />
        </PaginationItem>
      </PaginationContent>
    </PrimitivePagination>
  );
}
