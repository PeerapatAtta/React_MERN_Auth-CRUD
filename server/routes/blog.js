const express = require('express');
const router = express.Router();
const {create} = require('../controllers/blogController');

// router.get('/blog', create);
router.post('/create', create);

module.exports = router;