import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ButtonLogOutProps {
  collapsed: boolean;
  isMobile?: boolean;
}

export const ButtonLogOut = ({ collapsed, isMobile }: ButtonLogOutProps) => {
  const t = useTranslations("ButtonLogOut");
  return (
    <Button
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
      }}
      title={t("logout")}
      className={`flex items-center justify-center px-3 py-1 rounded-lg border-0 bg-transparent transition-all duration-200 group
        ${
          isMobile
            ? "text-red-500 hover:bg-red-900/20 hover:text-white active:bg-red-900/40 scale-110"
            : "gap-3 px-2 py-2 w-full bg-red-900 hover:bg-white hover:text-red-900 hover:border-red-900"
        }
      `}
      aria-label={t("logout")}
    >
      {!collapsed && (
        <span className={`text-xs font-medium ${isMobile ? "hidden" : ""}`}>{t("logout")}</span>
      )}
      <LogOut />
    </Button>
  );
};
