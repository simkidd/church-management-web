import DashboardHeader from "@/components/account/DashboardHeader";
import DashboardSidebar from "@/components/account/DashboardSidebar";
import MobileTabbar from "@/components/account/MobileTabbar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="container px-4 mx-auto lg:pt-8 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          <aside className="lg:col-span-3 relative">
            <DashboardSidebar />
          </aside>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
      <MobileTabbar />
    </div>
  );
}
