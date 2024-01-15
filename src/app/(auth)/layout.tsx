import RootLayout from "@/app/RootLayout";
import AuthHeader from "@/components/modules/Auth/AuthHeader/AuthHeader";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME} | Auth`,
  description: "authorization"
};

const AuthLayout = ({ children }: Props) => {
  return (
    <RootLayout>
      <AuthHeader />
      {children}
    </RootLayout>
  );
};

export default AuthLayout;
