const jwt = require('jsonwebtoken');
const { expressjwt: expressJWT } = require("express-jwt");

exports.login = (req, res) => {

    const { username, password } = req.body;

    // ตรวจสอบว่ามีการป้อนข้อมูลหรือไม่
    if (!username || !password) {
        return res.status(400).json({ error: "กรุณาป้อนชื่อผู้ใช้และรหัสผ่าน" });
    }

    // ตรวจสอบข้อมูลผู้ใช้ (ตัวอย่างนี้ใช้ข้อมูลที่เก็บไว้ในตัวแปร)
    if (password === process.env.PASSWORD) {
        // สร้าง JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // ส่ง token กลับไปยังผู้ใช้
        return res.json({ token, username });
    } else {
        return res.status(401).json({ error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
    }
}

// Middleware สำหรับตรวจสอบ JWT token
exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth' // กำหนดให้ข้อมูลผู้ใช้ที่ถูกตรวจสอบจะถูกเก็บไว้ใน req.auth
});