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
  pageSize,
  currentPage,
  classname,
}: IPagination & { classname?: string }) {
  const totalPages = Math.ceil(total / pageSize);
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    // Show all pages if they fit
    pages.push(...Array.from({ length: totalPages }, (_, i) => i + 1));
  } else {
    pages.push(1, 2); // Always include first two pages

    if (currentPage > 4) pages.push("..."); // Left ellipsis if needed

    // Middle pages (2 before and 2 after the current page)
    for (
      let i = Math.max(3, currentPage - 1);
      i <= Math.min(totalPages - 2, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push("..."); // Right ellipsis if needed

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
            href={getPageLink(currentPage - 1)}
            disabled={currentPage === 1}
            className="border"
          />
        </PaginationItem>
        <div className="hidden md:flex">
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink href={getPageLink(page)} isActive={currentPage === page}>
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
        </div>
        <div className="md:hidden">
          Page {currentPage} of {totalPages}
        </div>
        <PaginationItem>
          <PaginationNext
            href={getPageLink(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border"
          />
        </PaginationItem>
      </PaginationContent>
    </PrimitivePagination>
  );
}
