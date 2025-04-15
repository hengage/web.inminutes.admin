import DashboardNav from "@/components/layouts/DashboardNav";
import DashboardSidebar from "@/components/layouts/sidebar/DashboardSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="drawer lg:drawer-open text-black mx-auto max-w-[1640px] lg:bg-white">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#F5F5F5] p4 relative">
        <DashboardNav />
        {children}
      </div>
      <DashboardSidebar />
    </main>
  );
}
