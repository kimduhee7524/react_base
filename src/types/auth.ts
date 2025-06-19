export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
}

export interface SignupReq {
  username: string;
  password: string;
  email: string;
  phone: string;
}
