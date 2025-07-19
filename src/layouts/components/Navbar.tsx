import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-black">
          <Home className="w-5 h-5" />
        </Link>

        <nav className="flex gap-4">
          <Link to="/cask/list" className="text-gray-700 hover:text-black">
            Cask 리스트
          </Link>
        </nav>
      </div>
    </header>
  );
}
