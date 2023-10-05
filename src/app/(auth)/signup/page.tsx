"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";
import SignupForm from "@/app/components/Auth/SignupForm/SignupForm";

const SignupPage = () => {
  const { isAuth, isAuthChecking } = useAuth();

  if (isAuthChecking) return <PageSpinner />;
  if (isAuth) redirect("/dashboard");

  return (
    <section>
      <SignupForm />
    </section>
  );
};

export default SignupPage;
