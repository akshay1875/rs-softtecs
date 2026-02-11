const express = require('express');
const { body } = require('express-validator');
const {
  getQuestions,
  getQuestion,
  getCategories,
  getTestQuestions,
  submitQuiz,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/quizController');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/categories', getCategories);
router.get('/test/:category', getTestQuestions);
router.post('/submit', submitQuiz);

// Admin routes
router
  .route('/')
  .get(optionalAuth, getQuestions)
  .post(
    protect,
    [
      body('category').notEmpty().withMessage('Category is required'),
      body('question').notEmpty().withMessage('Question text is required'),
      body('options').isArray({ min: 2 }).withMessage('At least 2 options are required'),
      body('correctAnswer').isNumeric().withMessage('Correct answer index is required')
    ],
    createQuestion
  );

router
  .route('/:id')
  .get(getQuestion)
  .put(protect, updateQuestion)
  .delete(protect, deleteQuestion);

module.exports = router;
