export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col w-full items-center justify-center h-screen mb-4">
      <span className="text-[30px] font-[400] mb-2">
        <em className="font-[istok_web] ctm-header-1 text-ctm-primary-colour">00:00</em> In Minutes
      </span>
      {children}
    </main>
  );
}
