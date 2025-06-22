import TitleMain from "@/components/general/TitleMain";
import { getTranslations } from "next-intl/server";

export default async function NominaPage() {
  const t = await getTranslations("NominaPage");
  return (
    <div>
      <TitleMain title={t("title")} />
    </div>
  );
}
