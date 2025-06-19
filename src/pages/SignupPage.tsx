import { useFormController } from '@/hooks/useFormController';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signup } from '@/services/api/auth';
import { SignupForms } from '@/types/auth';
import { signupSchema } from '@/schemas/authSchema';
import { FormErrorMessage } from '@/components/FormErrorMessage';

export default function SignupPage() {
  async function handleSignupSubmit(values: SignupForms) {
    const { email, password, username, phone } = values;
    try {
      const ok = await signup({ email, password, username, phone });
      if (ok) toast.success('회원가입 성공!');
      else toast.error('회원가입이 실패하였습니다.');
    } catch {
      toast.error('회원가입 실패');
    }
  }

  const { errors, isSubmitting, handleInput, handleSubmit, registerRef } =
    useFormController<SignupForms>({
      validators: signupSchema,
      onSubmit: handleSignupSubmit,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-4 p-6 border rounded shadow"
    >
      <h3 className="text-2xl font-bold">회원가입</h3>

      <div>
        <Input
          type="email"
          placeholder="이메일"
          ref={registerRef('email')}
          onChange={() => handleInput('email')}
        />
        <FormErrorMessage message={errors.email} />
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

      <div>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          ref={registerRef('confirmPassword')}
          onChange={() => handleInput('confirmPassword')}
        />
        <FormErrorMessage message={errors.confirmPassword} />
      </div>

      <div>
        <Input
          type="text"
          placeholder="사용자 이름"
          ref={registerRef('username')}
          onChange={() => handleInput('username')}
        />
        <FormErrorMessage message={errors.username} />
      </div>

      <div>
        <Input
          type="text"
          placeholder="전화번호 (숫자만 입력)"
          ref={registerRef('phone')}
          onChange={() => handleInput('phone')}
        />
        <FormErrorMessage message={errors.phone} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리중...' : '회원가입'}
      </Button>
    </form>
  );
}
