"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
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
    // Si el usuario marcó "Recuérdame", guardamos en localStorage
    if (rememberMe) {
      localStorage.setItem(
        "rememberMeData",
        JSON.stringify({ id: identifier, remember: true, password: password })
      );
    } else {
      localStorage.removeItem("rememberMeData");
    }

    try {
      const response = await axios.post("api/auth/login", {
        username: identifier,
        password: password,
      });
      const data = response.data;
      if (data.error) {
        // manejar error (mostrar mensaje)
        console.error(data.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="identifier" className="block text-white mb-2">
          Usuario o Email
        </label>
        <input
          id="identifier"
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Usuario o correo electrónico"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-white mb-2">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tu contraseña"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-white">
          Recuérdame
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;
