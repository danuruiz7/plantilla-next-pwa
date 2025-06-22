// src/hooks/useLoginForm.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("rememberMeData");
    if (saved) {
      const { id, remember, password } = JSON.parse(saved);
      setIdentifier(id);
      setRememberMe(remember);
      setPassword(password);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (rememberMe) {
      localStorage.setItem(
        "rememberMeData",
        JSON.stringify({ id: identifier, remember: true, password })
      );
    } else {
      localStorage.removeItem("rememberMeData");
    }

    try {
      const response = await axios.post("api/auth/login", {
        username: identifier,
        password,
      });
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setError(null);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Error en login");
      setLoading(false);
      console.error("Error en login:", err);
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    handleSubmit,
  };
}