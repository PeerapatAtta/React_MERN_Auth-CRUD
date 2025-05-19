//Connect database
// ส่วนที่ 1: Import ไลบรารีและโมเดล
const slugify = require('slugify'); //slugify: ใช้เปลี่ยน title ให้เป็น URL-friendly เช่น "My Blog Post" → "my-blog-post"
const Blogs = require('../models/blogs'); // Blogs: คือโมเดลที่อ้างถึง collection ของบล็อกใน MongoDB (น่าจะถูกสร้างไว้ใน models/blogs.js)

// ส่วนที่ 2: ฟังก์ชัน create
// ใน Mongoose v7 ขึ้นไป ไม่รองรับ callback แล้ว มันรองรับ Promise เท่านั้น
// exports.create = (req, res) => {
exports.create = async (req, res) => {
    try {
        const { title, content, author } = req.body
        const slug = slugify(title)

        // Validate data
        switch (true) {
            case !title:
                return res.status(400).json({ error: "Title is required" });
                break;
            case !content:
                return res.status(400).json({ error: "Content is required" });
                break;
        }

        // Create blog
        const blog = await Blogs.create({ title, content, author, slug });

        // Success response
        return res.json({
            message: "Blog created successfully",
            blog
        });

    }

    catch (err) {
        return res.status(500).json({ error: "Same title" });
    }
};




//localhost:8000/api/blog/create
