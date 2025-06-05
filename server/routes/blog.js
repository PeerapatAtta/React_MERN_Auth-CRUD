const express = require('express');
const router = express.Router();
const {create, getAllblogs,singleBlog} = require('../controllers/blogController');

// URL
router.post('/create', create);
router.get('/blogs',getAllblogs);
router.get('/blog/:slug',singleBlog);

module.exports = router;