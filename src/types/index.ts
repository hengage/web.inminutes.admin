export interface pageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
