import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { signup } from '@/services/api/auth';
import { SignupReq } from '@/types/auth';

export default function SignupPage() {
  const refs = {
    email: useRef<HTMLInputElement | null>(null),
    password: useRef<HTMLInputElement | null>(null),
    confirmPassword: useRef<HTMLInputElement | null>(null),
    age: useRef<HTMLInputElement | null>(null),
    username: useRef<HTMLInputElement | null>(null),
    phone: useRef<HTMLInputElement | null>(null),
  };

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const validateEmail = (value: string): string | null => {
    if (!value.trim()) return '이메일은 필수입니다.';
    if (!/\S+@\S+\.\S+/.test(value)) return '이메일 형식이 아닙니다.';
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value.trim()) return '비밀번호는 필수입니다.';
    if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return null;
  };

  const validateConfirmPassword = (value: string): string | null => {
    const password = refs.password.current?.value || '';
    if (!value.trim()) return '비밀번호 확인은 필수입니다.';
    if (value !== password) return '비밀번호가 일치하지 않습니다.';
    return null;
  };

  const validateUsername = (value: string): string | null => {
    if (!value.trim()) return '사용자 이름은 필수입니다.';
    if (value.length < 2) return '사용자 이름은 2자 이상이어야 합니다.';
    return null;
  };

  const validatePhone = (value: string): string | null => {
    if (!value.trim()) return '전화번호는 필수입니다.';
    if (!/^\d{10,11}$/.test(value)) return '전화번호 형식이 올바르지 않습니다.';
    return null;
  };

  const validateField = (
    name: keyof typeof refs,
    value: string
  ): string | null => {
    switch (name) {
      case 'email':
        return validateEmail(value);
      case 'password':
        return validatePassword(value);
      case 'confirmPassword':
        return validateConfirmPassword(value);
      case 'username':
        return validateUsername(value);
      case 'phone':
        return validatePhone(value);
      default:
        return null;
    }
  };

  const handleInput = (name: keyof typeof refs) => {
    const el = refs[name].current;
    if (!el) return;
    const value = el.value;

    clearTimeout(timers.current[name]);
    timers.current[name] = setTimeout(() => {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300);
  };

  const validateAll = () => {
    const newErrors: Record<string, string | null> = {};
    for (const name in refs) {
      const el = refs[name as keyof typeof refs].current;
      if (el) {
        const value = el.value;
        newErrors[name] = validateField(name as keyof typeof refs, value);
      }
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const values: SignupReq = {
      email: refs.email.current?.value || '',
      password: refs.password.current?.value || '',
      username: refs.username.current?.value || '',
      phone: refs.phone.current?.value || '',
    };

    setIsSubmitting(true);
    try {
      const ok = await signup(values);
      if (ok) {
        toast.success('회원가입 성공!');
      } else {
        toast.error('회원가입이 실패하였습니다.');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        '알 수 없는 오류가 발생했습니다.';
      toast.error(`회원가입 실패: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          ref={refs.email}
          onChange={() => handleInput('email')}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호"
          ref={refs.password}
          onChange={() => handleInput('password')}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="비밀번호 확인"
          ref={refs.confirmPassword}
          onChange={() => handleInput('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="사용자 이름"
          ref={refs.username}
          onChange={() => handleInput('username')}
        />
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username}</p>
        )}
      </div>

      <div>
        <Input
          type="text"
          placeholder="전화번호 (숫자만 입력)"
          ref={refs.phone}
          onChange={() => handleInput('phone')}
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '처리중...' : '회원가입'}
      </Button>
    </form>
  );
}
