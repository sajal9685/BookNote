import React from 'react';
import {  Edit, Trash2, Star, StarOff, Sparkles } from 'lucide-react';


const NoteCard = ({ note, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-600"></div>
      
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 flex-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
          {note.title}
        </h3>
        <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onToggleFavorite(note._id, !note.isFavorite)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              note.isFavorite
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            }`}
          >
            {note.isFavorite ? <Star className="w-5 h-5 fill-current" /> : <StarOff className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => onEdit(note)} 
            className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onDelete(note._id)} 
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 text-sm line-clamp-4 leading-relaxed">
        {note.content}
      </p>
      
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 text-xs rounded-full font-medium hover:from-pink-200 hover:to-purple-200 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {new Date(note.createdAt).toLocaleDateString()}
        </div>
        {note.isFavorite && (
          <div className="text-xs text-yellow-600 font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Favorite
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
