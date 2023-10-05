"use client";
import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Routes } from "@/constants/routes";
import PageSpinner from "@/app/components/ui/PageSpinner/PageSpinner";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {

  const { isAuth, isAuthChecking, user } = useAuth();

  if (isAuthChecking) return <PageSpinner />;

  if (!isAuth) redirect("/signin");

  return (
    <>
      <div>nav</div>
      <section>{children}</section>
    </>
  );
};

export default ProfileLayout;
