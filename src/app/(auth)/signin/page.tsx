"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";
import SigninForm from "@/app/components/Auth/SigninForm/SigninForm";

const SigninPage = () => {
  // const { isAuth, isAuthChecking } = useAuth();

  // if (isAuthChecking) return <PageSpinner />;
  // if (isAuth) redirect("/dashboard");

  return (
    <section>
      <SigninForm />
    </section>
  );
};

export default SigninPage;
