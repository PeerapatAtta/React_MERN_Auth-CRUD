//Connect database
// ส่วนที่ 1: Import ไลบรารีและโมเดล
const slugify = require('slugify'); //slugify: ใช้เปลี่ยน title ให้เป็น URL-friendly เช่น "My Blog Post" → "my-blog-post"
const Blogs = require('../models/blogs'); // Blogs: คือโมเดลที่อ้างถึง collection ของบล็อกใน MongoDB (น่าจะถูกสร้างไว้ใน models/blogs.js)

// ส่วนที่ 2: ฟังก์ชัน create
exports.create = (req, res) => {
    const { title, content, author } = req.body
    let slug = slugify(title)

    switch (true) {
        case !title:
            return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" })
            break;
        case !content:
            return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" })
            break;
    }

    Blogs.create({ title, content, author, slug }, (err, blog) => {
        if (err) {
            res.status(400).json({ error: "มีชื่อบทความซ้ำกัน" })
        }
        res.json(blog)
    })
}





