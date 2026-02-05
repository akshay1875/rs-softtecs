const TeamMember = require('../models/TeamMember');
const { validationResult } = require('express-validator');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
exports.getTeamMembers = async (req, res, next) => {
  try {
    let query = {};
    
    // Filter by status for public access
    if (!req.user) {
      query.status = 'active';
    }

    // Filter by role
    if (req.query.role) {
      query.role = req.query.role;
    }

    const teamMembers = await TeamMember.find(query).sort({ displayOrder: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: teamMembers.length,
      data: teamMembers
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
exports.getTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create team member
// @route   POST /api/team
// @access  Private (Admin)
exports.createTeamMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const teamMember = await TeamMember.create(req.body);

    res.status(201).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
exports.updateTeamMember = async (req, res, next) => {
  try {
    let teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    teamMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete team member
// @route   DELETE /api/team/:id
// @access  Private (Admin)
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    await teamMember.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Toggle team member status
// @route   PUT /api/team/:id/status
// @access  Private (Admin)
exports.toggleStatus = async (req, res, next) => {
  try {
    let teamMember = await TeamMember.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    teamMember.status = teamMember.status === 'active' ? 'inactive' : 'active';
    await teamMember.save();

    res.status(200).json({
      success: true,
      data: teamMember
    });
  } catch (err) {
    next(err);
  }
};
