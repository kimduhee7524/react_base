import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ModalProvider } from '@/lib/modal';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import HomePage from '@/pages/HomePage';
import DefaultLayout from '@/layouts/DefaultLayout';
import CaskListPage from '@/pages/CaskListPage';
import CaskDetailPage from '@/pages/CaskDetailPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/cask/list', element: <CaskListPage /> },
      { path: '/cask/:id', element: <CaskDetailPage /> },
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
    <ModalProvider>
      <RouterProvider router={appRouter} />
    </ModalProvider>
  );
}
