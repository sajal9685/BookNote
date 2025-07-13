import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import NotesPage from './pages/NotesPage';
import BookmarksPage from './pages/BookmarksPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('notes');
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-primaryLight/20 min-h-screen flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300">
        {currentPage === 'notes' ? <NotesPage /> : <BookmarksPage />}
      </main>
    </div>
  );
};

const Root = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default Root;
