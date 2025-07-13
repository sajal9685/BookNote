const API_BASE = 'https://booknote-server.onrender.com/api';

const apiService = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.status === 204 ? null : response.json();
  },

  // Notes
  async getNotes(query = '', tags = '') {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (tags) params.append('tags', tags);
    return this.request(`/notes?${params}`);
  },

  async createNote(note) {
    return this.request('/notes', {
      method: 'POST',
      body: JSON.stringify(note),
    });
  },

  async updateNote(id, note) {
    return this.request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(note),
    });
  },

  async deleteNote(id) {
    return this.request(`/notes/${id}`, { method: 'DELETE' });
  },

  // Bookmarks
  async getBookmarks(query = '', tags = '') {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (tags) params.append('tags', tags);
    return this.request(`/bookmarks?${params}`);
  },

  async createBookmark(bookmark) {
    return this.request('/bookmarks', {
      method: 'POST',
      body: JSON.stringify(bookmark),
    });
  },

  async updateBookmark(id, bookmark) {
    return this.request(`/bookmarks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookmark),
    });
  },

  async deleteBookmark(id) {
    return this.request(`/bookmarks/${id}`, { method: 'DELETE' });
  },

  // Auth
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

export default apiService;
