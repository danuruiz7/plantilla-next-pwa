// src/components/auth/login/LoginForm.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/useLoginForm";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="identifier">Usuario o Email</Label>
        <Input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setIdentifier(e.target.value)
          }
          placeholder="Usuario o correo electrónico"
          required
          className="border-2 border-gray-300 hover:-translate-y-0.5 hover:border-none hover:shadow hover:shadow-gray-900 transition-all duration-100"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          placeholder="Tu contraseña"
          required
          className="border-2 border-gray-300 hover:-translate-y-0.5 hover:border-none hover:shadow hover:shadow-gray-500 transition-all duration-100"
          disabled={loading}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked: boolean) => setRememberMe(checked)}
          className="cursor-pointer hover:-translate-y-0.5 hover:shadow hover:shadow-gray-500 transition-all duration-100"
          disabled={loading}
        />
        <Label htmlFor="rememberMe">
          {rememberMe ? "Recordandote" : "Quien Eres?"}
        </Label>
      </div>
      {error && <Badge variant="destructive">{error}</Badge>}
      <Button
        type="submit"
        className="w-full cursor-pointer hover:-translate-y-0.5 hover:shadow hover:shadow-gray-500 transition-all duration-100 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Verificando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
