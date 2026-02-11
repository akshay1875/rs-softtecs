const QuizQuestion = require('../models/Quiz');
const { validationResult } = require('express-validator');

// @desc    Get all questions (admin) or filtered by category (public)
// @route   GET /api/quiz
// @access  Public
exports.getQuestions = async (req, res, next) => {
  try {
    let query = {};

    // Public users only see active questions
    if (!req.user) {
      query.status = 'active';
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }

    const questions = await QuizQuestion.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get available categories with question counts
// @route   GET /api/quiz/categories
// @access  Public
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await QuizQuestion.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          easy: { $sum: { $cond: [{ $eq: ['$difficulty', 'easy'] }, 1, 0] } },
          medium: { $sum: { $cond: [{ $eq: ['$difficulty', 'medium'] }, 1, 0] } },
          hard: { $sum: { $cond: [{ $eq: ['$difficulty', 'hard'] }, 1, 0] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      success: true,
      data: categories.map(c => ({
        name: c._id,
        count: c.count,
        easy: c.easy,
        medium: c.medium,
        hard: c.hard
      }))
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get quiz questions for a test (randomized, limited)
// @route   GET /api/quiz/test/:category
// @access  Public
exports.getTestQuestions = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const difficulty = req.query.difficulty;

    let query = {
      category: req.params.category,
      status: 'active'
    };

    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Get random questions
    const questions = await QuizQuestion.aggregate([
      { $match: query },
      { $sample: { size: limit } },
      {
        $project: {
          question: 1,
          options: 1,
          difficulty: 1,
          category: 1,
          // Don't send correctAnswer to frontend for fair testing
          _id: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit quiz answers and get score
// @route   POST /api/quiz/submit
// @access  Public
exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body; // [{ questionId, selectedAnswer }]

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide answers'
      });
    }

    const questionIds = answers.map(a => a.questionId);
    const questions = await QuizQuestion.find({ _id: { $in: questionIds } });

    let correct = 0;
    const results = answers.map(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (!question) return { questionId: answer.questionId, correct: false };

      const isCorrect = question.correctAnswer === answer.selectedAnswer;
      if (isCorrect) correct++;

      return {
        questionId: answer.questionId,
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        selectedAnswer: answer.selectedAnswer,
        explanation: question.explanation || ''
      };
    });

    res.status(200).json({
      success: true,
      data: {
        total: answers.length,
        correct,
        wrong: answers.length - correct,
        percentage: Math.round((correct / answers.length) * 100),
        results
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single question
// @route   GET /api/quiz/:id
// @access  Private (Admin)
exports.getQuestion = async (req, res, next) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.status(200).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};

// @desc    Create question
// @route   POST /api/quiz
// @access  Private (Admin)
exports.createQuestion = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const question = await QuizQuestion.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};

// @desc    Update question
// @route   PUT /api/quiz/:id
// @access  Private (Admin)
exports.updateQuestion = async (req, res, next) => {
  try {
    let question = await QuizQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    question = await QuizQuestion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: question });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete question
// @route   DELETE /api/quiz/:id
// @access  Private (Admin)
exports.deleteQuestion = async (req, res, next) => {
  try {
    const question = await QuizQuestion.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    await question.deleteOne();
    res.status(200).json({ success: true, message: 'Question deleted' });
  } catch (err) {
    next(err);
  }
};
