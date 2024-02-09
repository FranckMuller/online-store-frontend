"use client";
import { redirect } from "next/navigation";

import PageSpinner from "@/components/ui/PageSpinner/PageSpinner";

import { useMe } from "@/hooks/auth/useMe";

const AuthorizedGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthed, isAuthChecking } = useMe();

  if (!isAuthChecking && !isAuthed) {
    redirect("/signin");
  }

  console.log(isAuthChecking);
  return (
    <>
      <PageSpinner isLoading={isAuthChecking} />
      {isAuthed && children}
    </>
  );
};

export default AuthorizedGuard;
