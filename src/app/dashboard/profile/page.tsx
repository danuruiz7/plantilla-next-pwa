import { getTranslations } from "next-intl/server";
import { getUser } from "@/app/action/user/getUser";
import { FormUser } from "@/components/profile/FormUser";
import { redirect } from "next/navigation";
import TitleMain from "@/components/general/TitleMain";

export default async function ProfilePage() {
  const t = await getTranslations("ProfilePage");
  const UserData = await getUser();

  if (!UserData) {
    return redirect("/login");
  }

  console.log({ UserData });

  return (
    <div className="w-full mt-8">
      <TitleMain title={t("title")} />
      <FormUser UserData={UserData} />
    </div>
  );
}
