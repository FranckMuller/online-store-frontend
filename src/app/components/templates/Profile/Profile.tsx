import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfileAvatar } from "@/hooks/useProfileAvatar";
import ProfileAvatar from "./ProfileAvatar/ProfileAvatar";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import * as Api from "@/api";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const { data, isLoading, isSuccess } = useQuery(["profile"], {
    queryFn: () => Api.users.getById(user?.id as string),
    enabled: !!user?.id,
  });

  useEffect(() => {
    console.log(data);
  }, [isSuccess]);

  if (!user) return null;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {data ? (
        <>
          <ProfileAvatar avatar={data.avatar} />
          <div>{data.username}</div>
          <ProfileMenu />
          <button>Logout</button>
        </>
      ) : (
        <p>user not found</p>
      )}
    </>
  );
};

export default Profile;
