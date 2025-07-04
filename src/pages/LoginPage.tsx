import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormErrorMessage } from '@/components/form/FormErrorMessage';
import { toast, Toaster } from 'sonner';
import { login } from '@/services/api/auth';
import { useAuthStore } from '@/stores/auth';
import { LoginReq } from '@/types/auth';
import { loginSchema, LoginForm } from '@/schemas/authSchema';

export default function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      const { accessToken } = await login(values as LoginReq);
      toast.success('로그인 성공!');
      setToken(accessToken);
    } catch {
      toast.error('로그인 실패!');
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded shadow"
      >
        <h2 className="text-2xl font-bold">로그인</h2>

        <div>
          <Input placeholder="이름" {...register('username')} />
          <FormErrorMessage message={errors.username?.message} />
        </div>

        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register('password')}
          />
          <FormErrorMessage message={errors.password?.message} />
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로딩 중...' : '로그인'}
        </Button>
      </form>

      <Toaster richColors position="top-center" />
    </>
  );
}
