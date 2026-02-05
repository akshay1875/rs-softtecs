const mongoose = require('mongoose');
const slugify = require('slugify');

const syllabusItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  topics: [{
    type: String
  }]
});

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a course name'],
    trim: true,
    maxlength: [100, 'Course name cannot be more than 100 characters']
  },
  slug: String,
  duration: {
    type: String,
    required: [true, 'Please provide course duration'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  syllabus: [syllabusItemSchema],
  image: {
    type: String,
    default: '/images/courses/default-course.png'
  },
  icon: {
    type: String,
    default: 'fas fa-laptop-code'
  },
  category: {
    type: String,
    enum: ['programming', 'web-development', 'data-science', 'cloud', 'database', 'testing', 'other'],
    default: 'other'
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  price: {
    type: Number,
    default: 0
  },
  discountPrice: {
    type: Number
  },
  features: [{
    type: String
  }],
  prerequisites: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'coming-soon'],
    default: 'active'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create slug from name
courseSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  this.updatedAt = Date.now();
  next();
});

// Index for search
courseSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Course', courseSchema);
