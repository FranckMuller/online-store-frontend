"use client";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    <>
      <div>nav</div>
      <section>{children}</section>
    </>
  );
};

export default ProfileLayout;
