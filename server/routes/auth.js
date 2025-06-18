const express = require('express');
const router = express.Router();
const {login} = require('../controllers/authController');

// URL สำหรับการเข้าสู่ระบบ
router.post('/login', login); // ใช้ POST สำหรับการเข้าสู่ระบบ

// คือเส้นทางที่ใช้สำหรับการเข้าสู่ระบบ
module.exports = router;