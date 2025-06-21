// src/app/login/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full sm:w-[450px] max-w-md shadow-lg rounded-2xl py-12 bg-gradient-to-br from-white via-white/85 to-white">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
