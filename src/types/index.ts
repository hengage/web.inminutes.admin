export interface pageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface IPagination {
  currentPage: number;
  pageSize: number;
  total: number;
}
