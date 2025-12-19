import DashboardHeader from "@/components/account/DashboardHeader";
import DashboardSidebar from "@/components/account/DashboardSidebar";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <DashboardHeader />
      <div className="container px-4 mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
          <aside className="lg:col-span-3 ">
            <DashboardSidebar />
          </aside>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </div>
    </div>
  );
}
