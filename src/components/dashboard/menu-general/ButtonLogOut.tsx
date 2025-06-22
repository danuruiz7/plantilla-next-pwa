import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
interface ButtonLogOutProps {
  collapsed: boolean;
}

export const ButtonLogOut = ({ collapsed }: ButtonLogOutProps) => {
  const t = useTranslations("ButtonLogOut");
  return (
    <Button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
      }}
      className={`flex items-center gap-3 px-2 py-2 cursor-pointer rounded border border-transparent bg-red-900 transition group w-full hover:bg-white hover:text-red-900 hover:border-red-900 ${
        collapsed ? "justify-center" : "justify-center"
      }`}
    >
      <LogOut className="w-5 h-5" />
      {!collapsed && <span className="text-base">{t("logout")}</span>}
    </Button>
  );
};
