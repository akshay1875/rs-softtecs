const express = require('express');
const { body } = require('express-validator');
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleStatus,
  toggleFeatured
} = require('../controllers/testimonialController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getTestimonials)
  .post(
    protect,
    [
      body('studentName').notEmpty().withMessage('Student name is required'),
      body('testimonialText')
        .notEmpty()
        .withMessage('Testimonial text is required')
    ],
    createTestimonial
  );

router
  .route('/:id')
  .get(getTestimonial)
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

router.put('/:id/status', protect, toggleStatus);
router.put('/:id/featured', protect, toggleFeatured);

module.exports = router;
