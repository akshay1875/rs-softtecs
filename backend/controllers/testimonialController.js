const Testimonial = require('../models/Testimonial');
const { validationResult } = require('express-validator');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by status for public access
    if (!req.user) {
      query.status = 'active';
    }

    // Featured testimonials
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    const testimonials = await Testimonial.find(query).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private (Admin)
exports.createTestimonial = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin)
exports.updateTestimonial = async (req, res, next) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin)
exports.deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    await testimonial.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle testimonial status
// @route   PUT /api/testimonials/:id/status
// @access  Private (Admin)
exports.toggleStatus = async (req, res, next) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    testimonial.status = testimonial.status === 'active' ? 'inactive' : 'active';
    await testimonial.save();

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle featured status
// @route   PUT /api/testimonials/:id/featured
// @access  Private (Admin)
exports.toggleFeatured = async (req, res, next) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }

    testimonial.isFeatured = !testimonial.isFeatured;
    await testimonial.save();

    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};
