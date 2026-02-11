import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/updateprofile', data),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
  logout: () => api.get('/auth/logout'),
};

// Courses API
export const coursesAPI = {
  getAll: (params) => api.get('/courses', { params }),
  getOne: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
  toggleStatus: (id) => api.put(`/courses/${id}/status`),
};

// Reviews API
export const reviewsAPI = {
  getAll: (params) => api.get('/reviews', { params }),
  getOne: (id) => api.get(`/reviews/${id}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
  toggleStatus: (id) => api.put(`/reviews/${id}/status`),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params) => api.get('/testimonials', { params }),
  getOne: (id) => api.get(`/testimonials/${id}`),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
  toggleStatus: (id) => api.put(`/testimonials/${id}/status`),
  toggleFeatured: (id) => api.put(`/testimonials/${id}/featured`),
};

// Enquiries API
export const enquiriesAPI = {
  getAll: (params) => api.get('/enquiries', { params }),
  getOne: (id) => api.get(`/enquiries/${id}`),
  create: (data) => api.post('/enquiries', data),
  update: (id, data) => api.put(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
  markContacted: (id, notes) => api.put(`/enquiries/${id}/contacted`, { notes }),
  getStats: () => api.get('/enquiries/stats'),
};

// Team API
export const teamAPI = {
  getAll: (params) => api.get('/team', { params }),
  getOne: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`),
  toggleStatus: (id) => api.put(`/team/${id}/status`),
};

// Code Execution API
export const codeAPI = {
  getLanguages: () => api.get('/code/languages'),
  execute: (data) => api.post('/code/execute', data),
};

// Quiz API
export const quizAPI = {
  getAll: (params) => api.get('/quiz', { params }),
  getOne: (id) => api.get(`/quiz/${id}`),
  create: (data) => api.post('/quiz', data),
  update: (id, data) => api.put(`/quiz/${id}`, data),
  delete: (id) => api.delete(`/quiz/${id}`),
  getCategories: () => api.get('/quiz/categories'),
  getTestQuestions: (category, params) => api.get(`/quiz/test/${encodeURIComponent(category)}`, { params }),
  submitQuiz: (answers) => api.post('/quiz/submit', { answers }),
};

// Settings API
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

export default api;
