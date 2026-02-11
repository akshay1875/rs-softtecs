const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  courseInterested: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  source: {
    type: String,
    enum: ['website', 'google', 'facebook', 'referral', 'syllabus_download', 'popup', 'other'],
    default: 'website'
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'follow-up', 'enrolled', 'closed'],
    default: 'new'
  },
  notes: {
    type: String
  },
  contactedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contactedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
enquirySchema.index({ name: 'text', email: 'text', phone: 'text' });

module.exports = mongoose.model('Enquiry', enquirySchema);
