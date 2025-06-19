import axiosInstance from '@/services/axiosInstance';
import { LoginReq, LoginRes, SignupReq } from '@/types/auth';

export async function login(data: LoginReq): Promise<LoginRes> {
  const res = await axiosInstance.post<LoginRes>('/login', data);
  return res.data;
}

export async function signup(data: SignupReq): Promise<boolean> {
  const res = await axiosInstance.post<boolean>('/signup', data);
  return res.data;
}
