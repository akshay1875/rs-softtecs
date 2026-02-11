const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    trim: true
  },
  question: {
    type: String,
    required: [true, 'Please provide the question text'],
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Please provide the correct answer index'],
    min: 0
  },
  explanation: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for category filtering
quizQuestionSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('QuizQuestion', quizQuestionSchema);
