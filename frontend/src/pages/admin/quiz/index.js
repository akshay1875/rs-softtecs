import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { quizAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';

export default function AdminQuizPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, [filterCategory]);

  const fetchQuestions = async () => {
    try {
      const params = {};
      if (filterCategory) params.category = filterCategory;
      const { data } = await quizAPI.getAll(params);
      setQuestions(data.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.data.map(q => q.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      toast.error('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    try {
      await quizAPI.delete(id);
      fetchQuestions();
      toast.success('Question deleted successfully');
    } catch (error) {
      toast.error('Failed to delete question');
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const classes = {
      easy: 'badge-success',
      medium: 'badge-warning',
      hard: 'badge-error'
    };
    return classes[difficulty] || 'badge-warning';
  };

  return (
    <AdminLayout title="Quiz Questions Management">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-600">{questions.length} questions found</p>
          {categories.length > 0 && (
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-select text-sm py-1"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <Link href="/admin/quiz/new" className="btn btn-primary">
          <FaPlus /> Add New Question
        </Link>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>Options</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <div className="spinner mx-auto" />
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No questions found. Add your first question!
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question._id}>
                    <td>
                      <p className="font-medium max-w-xs truncate" title={question.question}>
                        {question.question}
                      </p>
                    </td>
                    <td>
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        {question.category}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getDifficultyBadge(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="text-gray-500">{question.options?.length || 0} options</td>
                    <td>
                      <span className={`badge ${question.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {question.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/quiz/${question._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(question._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
