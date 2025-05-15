const express = require('express');
const router = express.Router();

router.get('/blog', (req, res) => {
  res.json({ data: 'Blog API is working!' });
});

module.exports = router;