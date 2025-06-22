import { useState } from "react";
import axios from "axios";
import { UserSession } from "@/entities/User";
import { useRouter } from "next/navigation";

export function useProfileForm(initialUser: UserSession) {
  const [userInfo, setUserInfo] = useState<UserSession>(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [locale, setLocale] = useState(initialUser?.locale || "en");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  // Actualiza los campos del usuario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    const userUpdate = {
      id: userInfo.userId,
      username: userInfo.username,
      name: userInfo.name,
      lastname: userInfo.lastname,
      password: newPassword,
    }

    try {
      const response = await axios.put("/api/user/update", userUpdate);

      if (response.data?.error) {
        setError(response.data.error);
      } else {
        setSuccess(true);
        setUserInfo(response.data.user);
        router.refresh();
      }
    } catch (err) {
      setError("Error al actualizar el perfil. Intenta de nuevo.");
      console.error("Error al actualizar el perfil:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    userInfo,
    setUserInfo,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
    locale,
    setLocale,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
  };
}