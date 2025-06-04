const express = require('express');
const router = express.Router();
const {create, getAllblogs} = require('../controllers/blogController');

// router.get('/blog', create);
router.post('/create', create);
router.get('/blogs',getAllblogs);

module.exports = router;