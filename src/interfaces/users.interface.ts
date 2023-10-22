export interface IUser {
  id: string;
  username: string;
  email: string;
  avatarMini: string;
}

export interface IFullestUser extends IUser {
  phone: string;
  avatar: string;
}
