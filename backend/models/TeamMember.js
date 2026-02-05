const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide team member name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  designation: {
    type: String,
    required: [true, 'Please provide designation'],
    trim: true
  },
  role: {
    type: String,
    enum: ['founder', 'co-founder', 'director', 'trainer', 'management', 'support'],
    default: 'trainer'
  },
  photo: {
    type: String,
    default: '/images/team/default-member.png'
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  expertise: [{
    type: String
  }],
  experience: {
    type: String
  },
  qualifications: [{
    type: String
  }],
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String
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

module.exports = mongoose.model('TeamMember', teamMemberSchema);
