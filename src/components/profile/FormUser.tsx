"use client";
import { UserSession } from "@/entities/User";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileForm } from "@/hooks/users/useProfileForm";
import { useEffect } from "react";

export const FormUser = ({ UserData }: { UserData: UserSession }) => {
  const t = useTranslations("ProfilePage");

  const {
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
  } = useProfileForm(UserData);

  useEffect(() => {
    setUserInfo(UserData);
  }, [UserData, setUserInfo]);

  const handleLocaleChange = async (value: string) => {
    setLocale(value);
    document.cookie = `locale=${value}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-6 grid grid-cols-4 gap-4"
    >
      <div className="col-span-4 flex justify-start gap-20 items-center">
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 transition-all duration-100 cursor-pointer hover:-translate-y-0.5"
        >
          {loading ? t("saving") : t("save")}
        </Button>
        <div>
          {error && <div className="col-span-4 text-red-500">{error}</div>}
          {success && (
            <div className="col-span-4 text-green-600">
              {"¡Perfil actualizado!"}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input
          id="name"
          type="text"
          name="name"
          value={userInfo?.name || ""}
          onChange={handleChange}
          className={`${userInfo?.name ? "" : "border-red-500"}`}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="lastname">{t("lastname")}</Label>
        <Input
          id="lastname"
          type="text"
          name="lastname"
          value={userInfo?.lastname || ""}
          onChange={handleChange}
          className={`${userInfo?.lastname ? "" : "border-red-500"}`}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="username">{t("username")}</Label>
        <Input
          id="username"
          type="text"
          name="username"
          value={userInfo?.username}
          onChange={handleChange}
        />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="locale">{t("language")}</Label>
        <Select value={locale} onValueChange={handleLocaleChange}>
          <SelectTrigger id="locale" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ve">Venezolano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="newPassword">{t("newPassword")}</Label>
        <Input
          id="newPassword"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={`${newPassword ? "" : "border-red-500"}`}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
        <Input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={`${confirmPassword ? "" : "border-red-500"}`}
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={userInfo?.email}
          disabled
        />
      </div>

      <div className="col-span-2 space-y-2">
        <Label htmlFor="createdAt">{t("createdAt")}</Label>
        <Input
          id="createdAt"
          type="text"
          value={
            userInfo?.createdAt
              ? new Date(userInfo.createdAt).toLocaleString()
              : ""
          }
          readOnly
          disabled
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="updatedAt">{t("updatedAt")}</Label>
        <Input
          id="updatedAt"
          type="text"
          value={
            userInfo?.updatedAt
              ? new Date(userInfo.updatedAt).toLocaleString()
              : ""
          }
          readOnly
          disabled
        />
      </div>
      <div className="col-span-2 space-y-2">
        <Label htmlFor="lastLogin">{t("lastLogin")}</Label>
        <Input
          id="lastLogin"
          type="text"
          value={
            userInfo?.lastLogin
              ? new Date(userInfo.lastLogin).toLocaleString()
              : ""
          }
          readOnly
          disabled
        />
      </div>
    </form>
  );
};
