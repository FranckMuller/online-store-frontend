"use client";

type Props = {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: Props) => {
  return (
    
      <section>{children}</section>
  
  );
};

export default ProfileLayout;
