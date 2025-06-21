export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("token");
  // if (token) {
  //   const userData = await validToken(token?.value);
  //   console.log(userData);
  // }

  return <div>{children}</div>;
}
