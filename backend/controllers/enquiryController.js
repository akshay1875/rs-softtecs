const Enquiry = require('../models/Enquiry');
const { validationResult } = require('express-validator');

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
exports.getEnquiries = async (req, res, next) => {
  try {
    let query = {};

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status;
    }

    // Filter by date range
    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    // Search
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query)
      .populate('contactedBy', 'name email')
      .sort({ createdAt: -1 });

    // Get stats
    const stats = await Enquiry.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: enquiries.length,
      stats: stats,
      data: enquiries
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single enquiry
// @route   GET /api/enquiries/:id
// @access  Private (Admin)
exports.getEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('contactedBy', 'name email');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create enquiry (Public - Contact Form)
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const enquiry = await Enquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Thank you for your enquiry! We will contact you soon.',
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private (Admin)
exports.updateEnquiry = async (req, res, next) => {
  try {
    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    // If status is being changed to contacted, record who and when
    if (req.body.status === 'contacted' && enquiry.status === 'new') {
      req.body.contactedBy = req.user.id;
      req.body.contactedAt = Date.now();
    }

    enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('contactedBy', 'name email');

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark enquiry as contacted
// @route   PUT /api/enquiries/:id/contacted
// @access  Private (Admin)
exports.markContacted = async (req, res, next) => {
  try {
    let enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    enquiry.status = 'contacted';
    enquiry.contactedBy = req.user.id;
    enquiry.contactedAt = Date.now();
    if (req.body.notes) {
      enquiry.notes = req.body.notes;
    }
    
    await enquiry.save();

    enquiry = await Enquiry.findById(req.params.id)
      .populate('contactedBy', 'name email');

    res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get enquiry stats
// @route   GET /api/enquiries/stats
// @access  Private (Admin)
exports.getStats = async (req, res, next) => {
  try {
    const totalEnquiries = await Enquiry.countDocuments();
    const newEnquiries = await Enquiry.countDocuments({ status: 'new' });
    const contactedEnquiries = await Enquiry.countDocuments({ status: 'contacted' });
    const enrolledEnquiries = await Enquiry.countDocuments({ status: 'enrolled' });

    // Get enquiries by course
    const byCourse = await Enquiry.aggregate([
      {
        $group: {
          _id: '$courseInterested',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get recent enquiries (last 7 days)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentCount = await Enquiry.countDocuments({
      createdAt: { $gte: lastWeek }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalEnquiries,
        new: newEnquiries,
        contacted: contactedEnquiries,
        enrolled: enrolledEnquiries,
        recentWeek: recentCount,
        byCourse: byCourse
      }
    });
  } catch (err) {
    next(err);
  }
};
