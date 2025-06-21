import Sidebar from "@/components/dashboard/menu-general/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="text-white p-4 ">{children}</main>
    </div>
  );
}
