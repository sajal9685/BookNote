import React from 'react';
import { StickyNote, BookmarkPlus, User, LogOut, Heart } from 'lucide-react';

import { useAuth } from '../context/AuthContext';
const Header = ({ currentPage, setCurrentPage }) => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-gradient-to-r from-white via-pink-50 to-purple-50 shadow-lg border-b border-pink-100 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center py-4 gap-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                BookNote
              </h1>
            </div>
            <nav className="flex gap-1 bg-white/80 backdrop-blur-sm rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setCurrentPage('notes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'notes'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <StickyNote className="w-4 h-4" />
                <span className="hidden sm:inline">Notes</span>
              </button>
              <button
                onClick={() => setCurrentPage('bookmarks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === 'bookmarks'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <BookmarkPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Bookmarks</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
              <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user?.username || 'User'}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors duration-200 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
