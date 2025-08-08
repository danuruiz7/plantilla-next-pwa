import SidebarMobile from "@/components/dashboard/menu-general/SidebarMobile";
import SidebarDesktop from "@/components/dashboard/menu-general/SidebarDesktop";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarDesktop />
      <SidebarMobile />
      <main className="text-white p-4 w-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-800">
        {children}
      </main>
    </div>
  );
}
