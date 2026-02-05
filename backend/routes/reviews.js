const express = require('express');
const { body } = require('express-validator');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  toggleStatus
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getReviews)
  .post(
    protect,
    [
      body('reviewerName').notEmpty().withMessage('Reviewer name is required'),
      body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be between 1 and 5'),
      body('reviewMessage').notEmpty().withMessage('Review message is required')
    ],
    createReview
  );

router
  .route('/:id')
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.put('/:id/status', protect, toggleStatus);

module.exports = router;
