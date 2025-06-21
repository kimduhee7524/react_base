import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <nav className="hidden sm:flex gap-4">
            <Link to="/cask/list" className="text-gray-700 hover:text-black">
              Cask 리스트
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

