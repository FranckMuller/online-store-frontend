import RootLayout from "@/RootLayout";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Auth`,
  description: "authorization",
};

const AuthLayout = ({ children }: Props) => {
  return <RootLayout>{children}</RootLayout>;
};

export default AuthLayout;
