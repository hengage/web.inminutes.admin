export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full items-center justify-center h-screen mb-4">
      <span className="text-[30px] font-[400] mb-2 text-ctm-foreground">
        <em className="font-[istok_web] ctm-header-1 text-ctm-primary-400">00:00</em> In Minutes
      </span>
      {children}
    </main>
  );
}
