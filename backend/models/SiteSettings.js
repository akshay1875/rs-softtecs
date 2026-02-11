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
    phone: { type: String, default: '+91 9172 101 012' },
    phone2: { type: String, default: '+91 9172 201 101' },
    branchPhone: { type: String, default: '+91 9172 011 021' },
    branchPhone2: { type: String, default: '+91 9172 110 012' },
    email: { type: String, default: 'info@rssofttecs.com' },
    headOfficeAddress: { type: String, default: 'Office No 2, 4th Floor, Bhosale Shinde Arcade, JM Road, Near Deccan Bus Stop, Pune.' },
    branchAddress: { type: String, default: 'Office No 29/B Wing, 4th Floor, Yashashree Park, Warje Malwadi Rd, Near Karve Nagar PMT Bus Stop, Karve Nagar, Pune.' },
    address: { type: String, default: 'Pune, Maharashtra, India' },
    mapUrl: { type: String, default: 'https://maps.app.goo.gl/KeCcYoEwFwvMUAE66' }
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
