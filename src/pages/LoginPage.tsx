import { useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/services/api/auth';
import { useAuthStore } from '@/stores/auth';

export default function LoginPage() {
  const refs = {
    username: useRef<HTMLInputElement | null>(null),
    password: useRef<HTMLInputElement | null>(null),
  };

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [loading, setLoading] = useState(false);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const setToken = useAuthStore((state) => state.setToken);

  const validateUsername = (value: string): string | null => {
    if (!value.trim()) return '이름은 필수입니다.';
    if (value.length < 1) return '이름은 1자 이상이어야 합니다.';
    return null;
  };

  const validatePassword = (value: string): string | null => {
    if (!value.trim()) return '비밀번호는 필수입니다.';
    if (value.length < 6) return '비밀번호는 6자 이상이어야 합니다.';
    return null;
  };

  const validateField = (
    name: keyof typeof refs,
    value: string
  ): string | null => {
    switch (name) {
      case 'username':
        return validateUsername(value);
      case 'password':
        return validatePassword(value);
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

    const username = refs.username.current?.value || '';
    const password = refs.password.current?.value || '';

    setLoading(true);
    try {
      const { accessToken } = await login({ username, password });
      setToken(accessToken);
      toast.success('로그인 성공! 환영합니다.');
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        '알 수 없는 오류가 발생했습니다.';
      toast.error(`로그인 실패: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

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
            ref={refs.username}
            onChange={() => handleInput('username')}
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username}</p>
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

        <Button className="w-full" disabled={loading}>
          {loading ? '로딩 중...' : '로그인'}
        </Button>
      </form>

      <Toaster richColors position="top-center" />
    </>
  );
}
