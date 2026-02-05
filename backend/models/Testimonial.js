const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  studentPhoto: {
    type: String,
    default: '/images/testimonials/default-student.png'
  },
  testimonialText: {
    type: String,
    required: [true, 'Please provide testimonial text'],
    maxlength: [2000, 'Testimonial cannot be more than 2000 characters']
  },
  courseTaken: {
    type: String,
    trim: true
  },
  companyPlaced: {
    type: String,
    trim: true
  },
  designation: {
    type: String,
    trim: true
  },
  package: {
    type: String,
    trim: true
  },
  batchYear: {
    type: String,
    trim: true
  },
  linkedinUrl: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  isFeatured: {
    type: Boolean,
    default: false
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

module.exports = mongoose.model('Testimonial', testimonialSchema);
