import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <Navbar />
      <main className="px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
