const express = require('express');
const { body } = require('express-validator');
const {
  getEnquiries,
  getEnquiry,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  markContacted,
  getStats
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public route for contact form
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone')
      .matches(/^[0-9]{10}$/)
      .withMessage('Please provide a valid 10-digit phone number')
  ],
  createEnquiry
);

// Protected routes for admin
router.get('/', protect, getEnquiries);
router.get('/stats', protect, getStats);

router
  .route('/:id')
  .get(protect, getEnquiry)
  .put(protect, updateEnquiry)
  .delete(protect, deleteEnquiry);

router.put('/:id/contacted', protect, markContacted);

module.exports = router;
