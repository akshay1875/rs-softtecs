const express = require('express');
const { getLanguages, executeCode } = require('../controllers/codeController');

const router = express.Router();

router.get('/languages', getLanguages);
router.post('/execute', executeCode);

module.exports = router;
