"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  const router = useRouter();
  const { isAuth } = useAuth();

  if (!isAuth) router.push("/dashboard");

  return (
    <div>
      <div>nav</div>
      <section>{children}</section>
    </div>
  );
};

export default ProfileLayout;
