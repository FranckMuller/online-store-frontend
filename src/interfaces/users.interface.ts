export interface IUser {
  id: string;
  username: string;
  email: string;
  avatarMini: string;
}

export interface IFullestUser extends IUser {
  avatar: string;
  phone?: string;
  address?: string;
  socialNetworks?: {
    telegram?: string;
    instagram?: string;
    vk?: string;
  };
  website?: string;
  delivery?: string;
}
