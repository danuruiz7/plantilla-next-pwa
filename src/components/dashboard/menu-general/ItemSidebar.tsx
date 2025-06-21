"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, Paperclip, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Inicio", icon: <Home size={20} />, href: "/dashboard" },
  { name: "Nomina", icon: <Paperclip size={20} />, href: "/dashboard/nomina" },
  { name: "Usuarios", icon: <Users size={20} />, href: "/dashboard/users" },
  {
    name: "Configuración",
    icon: <Settings size={20} />,
    href: "/dashboard/settings",
  },
];

const ItemSidebar = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 mt-4 space-y-2 px-3">
      <TooltipProvider>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Tooltip key={item.name} delayDuration={200}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded group w-full
                      ${collapsed ? "justify-center" : "justify-start"}
                      transition-colors duration-300
                      ${
                        isActive
                          ? "bg-white text-black font-bold"
                          : "hover:bg-neutral-800"
                      }
                  `}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="text-sm">{item.name}</span>}
                </Link>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="ml-2">
                  {item.name}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </nav>
  );
};

export default ItemSidebar;
