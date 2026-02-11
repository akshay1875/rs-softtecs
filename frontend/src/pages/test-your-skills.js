import { useState, useEffect, useCallback } from 'react';
import Layout from '@/components/layout/Layout';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { quizAPI } from '@/utils/api';
import {
  FaLaptopCode, FaBrain, FaClock, FaCheckCircle, FaTimesCircle,
  FaArrowRight, FaArrowLeft, FaRedo, FaTrophy, FaChartBar,
  FaPlay, FaLightbulb, FaQuestionCircle
} from 'react-icons/fa';

// Category icons mapping
const getCategoryIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes('aptitude') || lower.includes('reasoning') || lower.includes('verbal'))
    return FaBrain;
  return FaLaptopCode;
};

// Category colors
const CATEGORY_COLORS = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-indigo-500 to-indigo-600',
  'from-red-500 to-red-600',
  'from-cyan-500 to-cyan-600',
  'from-amber-500 to-amber-600',
];

export default function TestYourSkillsPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [phase, setPhase] = useState('categories'); // categories | settings | quiz | result
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ limit: 10, difficulty: '' });
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // Auto-submit when timer runs out
  useEffect(() => {
    if (timeLeft === 0 && phase === 'quiz' && !result) {
      handleSubmitQuiz();
    }
  }, [timeLeft, phase, result]);

  const fetchCategories = async () => {
    try {
      const { data } = await quizAPI.getCategories();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = async () => {
    setLoading(true);
    try {
      const params = { limit: quizSettings.limit };
      if (quizSettings.difficulty) params.difficulty = quizSettings.difficulty;
      const { data } = await quizAPI.getTestQuestions(selectedCategory.name, params);
      if (data.data.length === 0) {
        alert('No questions available for the selected settings. Try different options.');
        setLoading(false);
        return;
      }
      setQuestions(data.data);
      setCurrentIndex(0);
      setAnswers({});
      setResult(null);
      // Set timer: 1.5 minutes per question
      const totalSeconds = data.data.length * 90;
      setTimeLeft(totalSeconds);
      setTimerActive(true);
      setPhase('quiz');
    } catch (error) {
      console.error('Error starting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (result) return; // Don't allow changes after submission
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = useCallback(async () => {
    setTimerActive(false);
    setSubmitting(true);
    try {
      const answerList = questions.map(q => ({
        questionId: q._id,
        selectedAnswer: answers[q._id] !== undefined ? answers[q._id] : -1
      }));
      const { data } = await quizAPI.submitQuiz(answerList);
      setResult(data.data);
      setPhase('result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  }, [questions, answers]);

  const resetQuiz = () => {
    setPhase('categories');
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setTimerActive(false);
    setTimeLeft(0);
  };

  const retryQuiz = () => {
    setPhase('settings');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
    setTimerActive(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading && phase === 'categories') {
    return (
      <Layout title="Test Your Skills">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="Test Your Skills">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Test Your <span className="text-accent-400">Skills</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Challenge yourself with MCQ quizzes on Programming Languages, Aptitude, and more.
            Track your progress and improve your skills!
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">

          {/* Phase 1: Category Selection */}
          {phase === 'categories' && (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Choose a Topic</h2>
                <p className="text-gray-600">Select a technology or subject to start your quiz</p>
              </div>

              {categories.length === 0 ? (
                <div className="text-center py-16">
                  <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No Quizzes Available Yet</h3>
                  <p className="text-gray-400">Check back soon! We are adding new quizzes regularly.</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {categories.map((cat, idx) => {
                    const Icon = getCategoryIcon(cat.name);
                    const colorClass = CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setPhase('settings');
                        }}
                        className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-100 hover:border-transparent hover:-translate-y-1"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="text-2xl" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{cat.name}</h3>
                        <p className="text-sm text-gray-500 mb-3">{cat.count} questions available</p>
                        <div className="flex gap-2 flex-wrap">
                          {cat.easy > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                              {cat.easy} Easy
                            </span>
                          )}
                          {cat.medium > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                              {cat.medium} Medium
                            </span>
                          )}
                          {cat.hard > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                              {cat.hard} Hard
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Phase 2: Quiz Settings */}
          {phase === 'settings' && selectedCategory && (
            <div className="max-w-lg mx-auto">
              <button
                onClick={() => setPhase('categories')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
              >
                <FaArrowLeft /> Back to Topics
              </button>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white mx-auto mb-4">
                    {(() => { const Icon = getCategoryIcon(selectedCategory.name); return <Icon className="text-3xl" />; })()}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h2>
                  <p className="text-gray-500">{selectedCategory.count} questions available</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, 20].map(num => (
                        <button
                          key={num}
                          onClick={() => setQuizSettings(prev => ({ ...prev, limit: num }))}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            quizSettings.limit === num
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { value: '', label: 'All' },
                        { value: 'easy', label: 'Easy' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'hard', label: 'Hard' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setQuizSettings(prev => ({ ...prev, difficulty: opt.value }))}
                          className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                            quizSettings.difficulty === opt.value
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <FaClock />
                      <span>Time: {formatTime(quizSettings.limit * 90)} ({(quizSettings.limit * 1.5).toFixed(0)} minutes)</span>
                    </div>
                    <button
                      onClick={startQuiz}
                      disabled={loading}
                      className="w-full btn btn-primary py-3 text-lg"
                    >
                      {loading ? 'Loading...' : <><FaPlay /> Start Quiz</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Quiz */}
          {phase === 'quiz' && questions.length > 0 && (
            <div className="max-w-3xl mx-auto">
              {/* Quiz Header */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-500">
                    {selectedCategory?.name}
                  </span>
                  <span className="text-sm text-gray-400">|</span>
                  <span className="text-sm font-medium">
                    Question {currentIndex + 1} of {questions.length}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    timeLeft < 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    <FaClock />
                    {formatTime(timeLeft)}
                  </div>
                  <span className="text-sm text-gray-500">
                    {Object.keys(answers).length}/{questions.length} answered
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                <div className="flex items-start gap-3 mb-6">
                  <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {currentIndex + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {questions[currentIndex].question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {questions[currentIndex].options.map((option, idx) => {
                    const isSelected = answers[questions[currentIndex]._id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(questions[currentIndex]._id, idx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 text-primary-900'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          isSelected
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-[15px]">{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="btn btn-secondary"
                >
                  <FaArrowLeft /> Previous
                </button>

                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="btn btn-primary"
                  >
                    Next <FaArrowRight />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submitting}
                    className="btn btn-primary bg-green-600 hover:bg-green-700"
                  >
                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                  </button>
                )}
              </div>

              {/* Question Numbers */}
              <div className="mt-8 bg-white rounded-xl shadow-md p-4">
                <p className="text-sm text-gray-500 mb-3">Jump to question:</p>
                <div className="flex flex-wrap gap-2">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q._id] !== undefined;
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={q._id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                          isCurrent
                            ? 'bg-primary-600 text-white'
                            : isAnswered
                            ? 'bg-green-100 text-green-700 border border-green-300'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Phase 4: Results */}
          {phase === 'result' && result && (
            <div className="max-w-3xl mx-auto">
              {/* Score Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  result.percentage >= 70 
                    ? 'bg-green-100 text-green-600'
                    : result.percentage >= 40
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  <FaTrophy className="text-4xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {result.percentage >= 70 ? 'Excellent!' : result.percentage >= 40 ? 'Good Effort!' : 'Keep Practicing!'}
                </h2>
                <p className="text-gray-500 mb-6">Quiz completed for <strong>{selectedCategory?.name}</strong></p>

                <div className="flex justify-center gap-8 mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary-600">{result.percentage}%</p>
                    <p className="text-sm text-gray-500">Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">{result.correct}</p>
                    <p className="text-sm text-gray-500">Correct</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-red-600">{result.wrong}</p>
                    <p className="text-sm text-gray-500">Wrong</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-600">{result.total}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3 mb-8">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      result.percentage >= 70 ? 'bg-green-500'
                        : result.percentage >= 40 ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <button onClick={retryQuiz} className="btn btn-primary">
                    <FaRedo /> Try Again
                  </button>
                  <button onClick={resetQuiz} className="btn btn-secondary">
                    <FaChartBar /> Browse Topics
                  </button>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Results</h3>
                <div className="space-y-4">
                  {questions.map((q, idx) => {
                    const r = result.results.find(r => r.questionId === q._id);
                    const isCorrect = r?.correct;
                    const userAnswer = r?.selectedAnswer;
                    const correctAnswer = r?.correctAnswer;

                    return (
                      <div
                        key={q._id}
                        className={`p-5 rounded-xl border-2 ${
                          isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`flex-shrink-0 mt-0.5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? <FaCheckCircle className="text-lg" /> : <FaTimesCircle className="text-lg" />}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-2">
                              <span className="text-gray-500">Q{idx + 1}.</span> {q.question}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {q.options.map((opt, optIdx) => (
                                <div
                                  key={optIdx}
                                  className={`text-sm px-3 py-2 rounded-lg flex items-center gap-2 ${
                                    optIdx === correctAnswer
                                      ? 'bg-green-200 text-green-800 font-medium'
                                      : optIdx === userAnswer && !isCorrect
                                      ? 'bg-red-200 text-red-800 line-through'
                                      : 'bg-white/60 text-gray-600'
                                  }`}
                                >
                                  <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                                  {opt}
                                  {optIdx === correctAnswer && <FaCheckCircle className="ml-auto text-green-600" />}
                                  {optIdx === userAnswer && !isCorrect && <FaTimesCircle className="ml-auto text-red-500" />}
                                </div>
                              ))}
                            </div>
                            {r?.explanation && (
                              <div className="mt-3 flex items-start gap-2 text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
                                <FaLightbulb className="text-yellow-500 mt-0.5 flex-shrink-0" />
                                <span>{r.explanation}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}
