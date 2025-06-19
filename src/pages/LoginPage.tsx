import { useFormController } from '@/hooks/useFormController';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { toast, Toaster } from 'sonner';
import { login } from '@/services/api/auth';
import { useAuthStore } from '@/stores/auth';
import { loginSchema } from '@/schemas/authSchema';
import { LoginReq } from '@/types/auth';

export default function LoginPage() {
  const setToken = useAuthStore((state) => state.setToken);
  async function handleLoginSubmit(values: LoginReq) {
    try {
      const { accessToken } = await login(values);
      toast.success('로그인 성공!');
      setToken(accessToken);
    } catch {
      toast.error('로그인 실패!');
    }
  }

  const { errors, isSubmitting, handleInput, handleSubmit, registerRef } =
    useFormController<LoginReq>({
      validators: loginSchema,
      onSubmit: handleLoginSubmit,
    });

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded shadow"
      >
        <h2 className="text-2xl font-bold">로그인</h2>

        <div>
          <Input
            placeholder="이름"
            ref={registerRef('username')}
            onChange={() => handleInput('username')}
          />
          <FormErrorMessage message={errors.username} />
        </div>

        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            ref={registerRef('password')}
            onChange={() => handleInput('password')}
          />
          <FormErrorMessage message={errors.password} />
        </div>

        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '로딩 중...' : '로그인'}
        </Button>
      </form>

      <Toaster richColors position="top-center" />
    </>
  );
}
