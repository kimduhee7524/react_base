export interface LoginReq {
  username: string;
  password: string;
}

export interface LoginRes {
  accessToken: string;
}

export interface SignupReq extends LoginReq {
  email: string;
  phone: string;
}

export interface SignupForms extends SignupReq {
  confirmPassword: string;
}
