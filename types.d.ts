type ErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

interface IUser {
  id: string;
  username: string;
  email: string;
  avatarMini: string;
}

interface IFullestUser extends IUser {
  phone: string;
  avatar: string;
}
