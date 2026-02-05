const express = require('express');
const { body } = require('express-validator');
const {
  getTeamMembers,
  getTeamMember,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleStatus
} = require('../controllers/teamController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getTeamMembers)
  .post(
    protect,
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('designation').notEmpty().withMessage('Designation is required')
    ],
    createTeamMember
  );

router
  .route('/:id')
  .get(getTeamMember)
  .put(protect, updateTeamMember)
  .delete(protect, deleteTeamMember);

router.put('/:id/status', protect, toggleStatus);

module.exports = router;
