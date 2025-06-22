import TitleMain from "@/components/general/TitleMain";
import { getTranslations } from "next-intl/server";

export default async function DashboardPage() {
  const t = await getTranslations("DashboardPage");
  return (
    <div>
      <TitleMain title={t("title")} />
    </div>
  );
}
