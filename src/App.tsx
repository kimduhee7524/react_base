import { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { useAuthStore } from '@/stores/auth';


export default function App() {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [setToken]);

  return (
    <>
      <AppRoutes />
    </>
  );
}

