// src/app/login/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/login/LoginForm";
import { getTranslations } from "next-intl/server";

export default async function LoginPage() {
  const t = await getTranslations("login");

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full sm:w-[450px] max-w-md shadow-lg rounded-2xl py-10 bg-gradient-to-br from-white via-white/85 to-white">
        <CardHeader>
          <CardTitle className="text-3xl text-center">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
