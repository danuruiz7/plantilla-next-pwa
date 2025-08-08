"use client";
import { useState } from "react";
import { SquareArrowRight, SquareArrowLeft } from "lucide-react";
import ItemSidebar from "./ItemSidebar";
import { ButtonLogOut } from "./ButtonLogOut";
import { Button } from "@/components/ui/button";

export default function SidebarDesktop() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={` hidden md:flex h-screen bg-neutral-900 text-white flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-58"
      }`}
    >
      <div
        className={`flex items-center p-2  mt-2 border-b border-neutral-700 ${
          collapsed ? "justify-center" : "justify-center"
        } `}
      >
        {!collapsed && (
          <div className="px-4 py-2 text-md text-neutral-300 font-semibold whitespace-nowrap">
            Nombre de la APP
          </div>
        )}
        <Button
          asChild
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed((c) => !c)}
          className="text-white cursor-pointer"
        >
          {collapsed ? (
            <SquareArrowRight className="w-7 h-7 transition-all duration-300" />
          ) : (
            <SquareArrowLeft className="w-7 h-7 transition-all duration-300" />
          )}
        </Button>
      </div>

      <ItemSidebar collapsed={collapsed} />

      <div className="m-4">
        <ButtonLogOut collapsed={collapsed} />
      </div>
    </aside>
  );
}
