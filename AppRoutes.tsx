import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const appRouter = createBrowserRouter([
  {
    path: '/',
  },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}
