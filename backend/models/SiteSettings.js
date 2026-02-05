const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'RS Softtecs Pvt Ltd'
  },
  tagline: {
    type: String,
    default: "Pune's #1 IT Training & Placement Institute"
  },
  logo: {
    type: String,
    default: '/images/logo.png'
  },
  favicon: {
    type: String,
    default: '/images/favicon.ico'
  },
  contact: {
    phone: { type: String, default: '+91-9876543210' },
    email: { type: String, default: 'info@rssofttecs.com' },
    address: { type: String, default: 'Pune, Maharashtra, India' },
    mapUrl: { type: String }
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    linkedin: String,
    youtube: String,
    twitter: String
  },
  stats: {
    studentsPlaced: { type: Number, default: 5000 },
    yearsExperience: { type: Number, default: 13 },
    coursesOffered: { type: Number, default: 25 },
    hiringPartners: { type: Number, default: 200 }
  },
  aboutUs: {
    shortDescription: String,
    fullDescription: String,
    mission: String,
    vision: String,
    founderMessage: String
  },
  workingHours: {
    weekdays: { type: String, default: 'Mon - Fri: 9:00 AM - 7:00 PM' },
    saturday: { type: String, default: 'Sat: 9:00 AM - 5:00 PM' },
    sunday: { type: String, default: 'Sun: Closed' }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String]
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
