const GoogleReview = require('../models/GoogleReview');
const { validationResult } = require('express-validator');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by status for public access
    if (!req.user) {
      query.status = 'active';
    }

    const reviews = await GoogleReview.find(query).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await GoogleReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private (Admin)
exports.createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const review = await GoogleReview.create(req.body);

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private (Admin)
exports.updateReview = async (req, res, next) => {
  try {
    let review = await GoogleReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review = await GoogleReview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await GoogleReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle review status
// @route   PUT /api/reviews/:id/status
// @access  Private (Admin)
exports.toggleStatus = async (req, res, next) => {
  try {
    let review = await GoogleReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.status = review.status === 'active' ? 'inactive' : 'active';
    await review.save();

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
};
