import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-md bg-gray-500 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Iniciar Sesión
        </h2>
        <LoginForm />
      </div>
    </div>
  );
}
