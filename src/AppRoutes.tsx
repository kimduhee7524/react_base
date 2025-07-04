import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
