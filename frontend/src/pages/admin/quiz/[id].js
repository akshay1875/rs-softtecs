import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { quizAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaPlus, FaTrash, FaCheck } from 'react-icons/fa';

const PRESET_CATEGORIES = [
  'C Language',
  'C++ Language',
  'Java',
  'Python',
  'JavaScript',
  'HTML & CSS',
  'SQL',
  'Data Structures',
  'Operating Systems',
  'Computer Networks',
  'Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'General Knowledge',
  'React',
  'Node.js',
  'PHP',
  '.NET',
  'Angular',
  'DevOps',
  'Cloud Computing',
  'Linux',
  'DBMS',
  'Software Engineering',
];

export default function EditQuizQuestionPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [useCustomCategory, setUseCustomCategory] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    difficulty: 'medium',
    status: 'active'
  });

  useEffect(() => {
    if (id) fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      const { data } = await quizAPI.getOne(id);
      const q = data.data;
      setFormData({
        category: q.category || '',
        question: q.question || '',
        options: q.options || ['', '', '', ''],
        correctAnswer: q.correctAnswer || 0,
        explanation: q.explanation || '',
        difficulty: q.difficulty || 'medium',
        status: q.status || 'active'
      });
      // Check if category is in preset
      if (!PRESET_CATEGORIES.includes(q.category)) {
        setUseCustomCategory(true);
      }
    } catch (error) {
      toast.error('Failed to fetch question');
      router.push('/admin/quiz');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (idx, value) => {
    const newOptions = [...formData.options];
    newOptions[idx] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    if (formData.options.length >= 6) return;
    setFormData(prev => ({ ...prev, options: [...prev.options, ''] }));
  };

  const removeOption = (idx) => {
    if (formData.options.length <= 2) return;
    const newOptions = formData.options.filter((_, i) => i !== idx);
    let newCorrect = formData.correctAnswer;
    if (idx === formData.correctAnswer) newCorrect = 0;
    else if (idx < formData.correctAnswer) newCorrect--;
    setFormData(prev => ({ ...prev, options: newOptions, correctAnswer: newCorrect }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const filledOptions = formData.options.filter(o => o.trim());
    if (filledOptions.length < 2) {
      toast.error('At least 2 options are required');
      setLoading(false);
      return;
    }

    const cleanedData = {
      ...formData,
      options: formData.options.filter(o => o.trim()),
    };

    if (cleanedData.correctAnswer >= cleanedData.options.length) {
      cleanedData.correctAnswer = 0;
    }

    try {
      await quizAPI.update(id, cleanedData);
      toast.success('Question updated successfully');
      router.push('/admin/quiz');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update question');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Question">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Question">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Questions
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Question */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Question Details</h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Question *</label>
                  <textarea
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="form-textarea"
                    placeholder="Enter the question text..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Explanation (shown after answering)</label>
                  <textarea
                    name="explanation"
                    value={formData.explanation}
                    onChange={handleChange}
                    rows={2}
                    className="form-textarea"
                    placeholder="Explain why the correct answer is correct..."
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Answer Options</h2>
                {formData.options.length < 6 && (
                  <button type="button" onClick={addOption} className="btn btn-secondary btn-sm">
                    <FaPlus /> Add Option
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">Click the radio button to mark the correct answer.</p>
              <div className="space-y-3">
                {formData.options.map((option, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, correctAnswer: idx }))}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        formData.correctAnswer === idx
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 text-gray-300 hover:border-green-400'
                      }`}
                      title={formData.correctAnswer === idx ? 'Correct answer' : 'Mark as correct'}
                    >
                      <FaCheck className="text-sm" />
                    </button>
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(idx, e.target.value)}
                      className={`form-input flex-1 ${
                        formData.correctAnswer === idx ? 'border-green-300 bg-green-50' : ''
                      }`}
                      placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    />
                    {formData.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  {!useCustomCategory ? (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {PRESET_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="e.g., Machine Learning"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setUseCustomCategory(!useCustomCategory);
                      if (!useCustomCategory) setFormData(prev => ({ ...prev, category: '' }));
                      else setFormData(prev => ({ ...prev, category: PRESET_CATEGORIES[0] }));
                    }}
                    className="text-xs text-primary-600 hover:underline mt-1"
                  >
                    {useCustomCategory ? 'Use preset category' : 'Use custom category'}
                  </button>
                </div>
                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? 'Updating...' : <><FaSave /> Update Question</>}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
