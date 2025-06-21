import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function DefaultLayout() {
  return (
    <div className="min-h-screen bg-background overflow-y-auto">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
