import React from 'react';
import {  Edit, Trash2, Star, StarOff, Sparkles } from 'lucide-react';

const BookmarkCard = ({ bookmark, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
            >
              {bookmark.title}
            </a>
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-pink-600 hover:text-pink-700 hover:underline break-all font-medium"
          >
            {bookmark.url}
          </a>
        </div>
        <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleFavorite(bookmark._id, !bookmark.isFavorite)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              bookmark.isFavorite
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
          >
            {bookmark.isFavorite ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => onEdit(bookmark)} 
            className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(bookmark._id)} 
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {bookmark.description && (
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {bookmark.description}
        </p>
      )}
      
      {bookmark.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium hover:from-purple-200 hover:to-pink-200 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Added on: {new Date(bookmark.createdAt).toLocaleDateString()}
        </div>
        {bookmark.isFavorite && (
          <div className="text-xs text-yellow-600 font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Favorite
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;
