import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import DefaultLayout from '@/layouts/DefaultLayout';
import CaskListPage from '@/pages/CaskListPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/cask/list', element: <CaskListPage /> },
    ],
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
