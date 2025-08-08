"use client";

import { ButtonLogOut } from "./ButtonLogOut";
import Link from "next/link";
import { navItems } from "./ItemSidebar";
import { usePathname } from "next/navigation";

export default function SidebarMobile() {
  const pathname = usePathname();
  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 w-full bg-neutral-900 border-t border-neutral-800 justify-around items-center z-50 shadow-lg pb-10 pt-4">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.key}
            href={item.href}
            className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-all duration-200 ${
              isActive ? "bg-neutral-200 text-black shadow-md scale-120" : "text-neutral-400"
            }`}
          >
            <span className="transition-transform duration-200">{item.iconMobile}</span>
          </Link>
        );
      })}
      <ButtonLogOut collapsed={false} isMobile />
    </nav>
  );
}
