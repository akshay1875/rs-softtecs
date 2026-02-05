const Course = require('../models/Course');
const { validationResult } = require('express-validator');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by status for public access
    if (!req.user) {
      query.status = 'active';
    }

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by level
    if (req.query.level) {
      query.level = req.query.level;
    }

    // Search
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Featured courses
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
exports.getCourse = async (req, res, next) => {
  try {
    let course;
    
    // Check if param is slug or id
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(req.params.id);
    } else {
      course = await Course.findOne({ slug: req.params.id });
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create course
// @route   POST /api/courses
// @access  Private (Admin)
exports.createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin)
exports.updateCourse = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle course status
// @route   PUT /api/courses/:id/status
// @access  Private (Admin)
exports.toggleStatus = async (req, res, next) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    course.status = course.status === 'active' ? 'inactive' : 'active';
    await course.save();

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (err) {
    next(err);
  }
};
