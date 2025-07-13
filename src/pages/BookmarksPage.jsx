import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import SearchFilter from '../components/SearchFilter';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import apiService from '../services/apiService';


const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tags, setTags] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = useCallback(
    debounce(async (search, tags) => {
      setLoading(true);
      try {
        const data = await apiService.getBookmarks(search, tags);
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchBookmarks(searchTerm, tags);
    return () => fetchBookmarks.cancel();
  }, [searchTerm, tags, fetchBookmarks]);

  const handleSave = async (bookmarkData) => {
    try {
      if (editingBookmark) {
        await apiService.updateBookmark(editingBookmark._id, bookmarkData);
      } else {
        await apiService.createBookmark(bookmarkData);
      }
      setShowForm(false);
      setEditingBookmark(null);
      fetchBookmarks(searchTerm, tags);
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await apiService.deleteBookmark(id);
        fetchBookmarks(searchTerm, tags);
      } catch (error) {
        console.error('Error deleting bookmark:', error);
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const bookmark = bookmarks.find(b => b._id === id);
      await apiService.updateBookmark(id, { ...bookmark, isFavorite });
      fetchBookmarks(searchTerm, tags);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleEdit = (bookmark) => {
    setEditingBookmark(bookmark);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingBookmark(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primaryLighter/20">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primaryDark rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 font-display">Bookmarks</h1>
                <p className="text-neutral-600 text-sm mt-1">
                  {bookmarks.length} saved {bookmarks.length === 1 ? 'bookmark' : 'bookmarks'}
                </p>
              </div>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Bookmark
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            tags={tags}
            setTags={setTags}
            onAddNew={handleAddNew}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primaryLight rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <p className="text-primary text-lg font-medium animate-pulse-soft">Loading bookmarks...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-primaryLight to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2 font-display">No bookmarks found</h3>
              <p className="text-neutral-600 mb-6">
                {searchTerm || tags ? 'Try adjusting your search filters' : 'Create your first bookmark to get started!'}
              </p>
              <button
                onClick={handleAddNew}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primaryDark text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your First Bookmark
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((bookmark, index) => (
              <div
                key={bookmark._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BookmarkCard
                  bookmark={bookmark}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <BookmarkForm
            bookmark={editingBookmark}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingBookmark(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;