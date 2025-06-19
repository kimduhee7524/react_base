import { s } from '@/utils/authValidators';

export const loginSchema = {
  username: s.string().required().min(1),
  password: s.string().required().min(6),
};

export const signupSchema = {
  email: s.string().required().email(),
  password: s.string().required().min(6),
  confirmPassword: s.string().required().same('password'),
  username: s.string().required().min(2),
  phone: s
    .string()
    .required()
    .regex(/^\d{10,11}$/, '전화번호 형식이 올바르지 않습니다.'),
};
