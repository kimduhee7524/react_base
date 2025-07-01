import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, '이름을 입력해 주세요.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상입니다.'),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(2, { message: '사용자 이름은 최소 2자 이상이어야 합니다.' }),
    phone: z.string().regex(/^\d{10,11}$/, {
      message: '전화번호 형식이 올바르지 않습니다.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type SignupForms = z.infer<typeof signupSchema>;
