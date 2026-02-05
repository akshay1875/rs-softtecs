const express = require('express');
const { body } = require('express-validator');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleStatus
} = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getCourses)
  .post(
    protect,
    [
      body('name').notEmpty().withMessage('Course name is required'),
      body('duration').notEmpty().withMessage('Duration is required'),
      body('description').notEmpty().withMessage('Description is required')
    ],
    createCourse
  );

router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

router.put('/:id/status', protect, toggleStatus);

module.exports = router;
