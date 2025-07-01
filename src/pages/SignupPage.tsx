import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupForms } from '@/schemas/authSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signup } from '@/services/api/auth';
import { FormErrorMessage } from '@/components/FormErrorMessage';
import { SignupReq } from '@/types/auth';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForms>({
    mode: 'onChange',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (values: SignupForms) => {
    const { confirmPassword, ...rest } = values;
    const signupData = rest as SignupReq;
    try {
      const ok = await signup(signupData);
      if (ok) toast.success('회원가입 성공!');
      else toast.error('회원가입이 실패하였습니다.');
    } catch {
      toast.error('회원가입 실패');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded shadow"
    >
      <h3 className="text-2xl font-bold">회원가입</h3>

      <div>
        <Input type="email" placeholder="이메일" {...register('email')} />
        <FormErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        <FormErrorMessage message={errors.password?.message} />
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          {...register('confirmPassword')}
        />
        <FormErrorMessage message={errors.confirmPassword?.message} />
      </div>

      <div>
        <Input
          type="text"
          placeholder="사용자 이름"
          {...register('username')}
        />
        <FormErrorMessage message={errors.username?.message} />
      </div>

      <div>
        <Input
          type="text"
          placeholder="전화번호 (숫자만 입력)"
          {...register('phone')}
        />
        <FormErrorMessage message={errors.phone?.message} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리중...' : '회원가입'}
      </Button>
    </form>
  );
}
