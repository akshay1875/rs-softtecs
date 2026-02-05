const mongoose = require('mongoose');

const googleReviewSchema = new mongoose.Schema({
  reviewerName: {
    type: String,
    required: [true, 'Please provide reviewer name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewMessage: {
    type: String,
    required: [true, 'Please provide review message'],
    maxlength: [1000, 'Review cannot be more than 1000 characters']
  },
  reviewerPhoto: {
    type: String,
    default: '/images/reviews/default-avatar.png'
  },
  reviewDate: {
    type: Date,
    default: Date.now
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GoogleReview', googleReviewSchema);
