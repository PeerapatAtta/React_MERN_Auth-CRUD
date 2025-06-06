//Connect database
// Import ไลบรารีและโมเดล
const slugify = require('slugify'); //slugify: ใช้เปลี่ยน title ให้เป็น URL-friendly เช่น "My Blog Post" → "my-blog-post"
const Blogs = require('../models/blogs'); // Blogs: คือโมเดลที่อ้างถึง collection ของบล็อกใน MongoDB (น่าจะถูกสร้างไว้ใน models/blogs.js)
const { v4: uuidv4 } = require('uuid'); // uuidv4: ใช้สร้าง UUID (Universally Unique Identifier) สำหรับการระบุเอกลักษณ์ของบล็อก


// ฟังก์ชัน create
exports.create = (req, res) => {
    const { title, content, author } = req.body
    let slug = slugify(title) // ใช้ slugify เพื่อสร้าง slug จาก title

    if (!slug) slug = uuidv4(); // ถ้า slug ไม่ได้ถูกสร้างจาก title ให้ใช้ UUID แทน

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

// ฟังก์ชัน getAllblogs
exports.getAllblogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        if (err) {
            return res.status(400).json({ error: "ไม่พบข้อมูลบล็อก" })
        }
        res.json(blogs)
    })
}

// ฟังก์ชัน singleBlog
exports.singleBlog = (req, res) => {
    const { slug } = req.params
    Blogs.findOne({ slug }).exec((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({ error: "ไม่พบข้อมูลบล็อก" })
        }
        res.json(blog)
    })
}

// ฟังก์ชัน remove (ลบบล็อกตาม slug)
exports.remove = (req, res) => {
    const { slug } = req.params
    Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
        if (err || !blog) {
            return res.status(400).json({ error: "ไม่พบข้อมูลบล็อก" })
        }
        res.json({ message: "ลบบล็อกสำเร็จ" })
    })
}

// ฟังก์ชัน update (อัปเดตบล็อกตาม slug)
exports.update = (req, res) => {
    const { slug } = req.params // รับ slug จากพารามิเตอร์ URL
    const { title, content, author } = req.body // รับข้อมูลจาก body ของคำขอ
    let updatedSlug = slugify(title)

    if (!updatedSlug) updatedSlug = uuidv4();

    Blogs.findOneAndUpdate({ slug }, { title, content, author, slug: updatedSlug }, { new: true })
        .exec((err, blog) => {
            if (err || !blog) {
                return res.status(400).json({ error: "ไม่พบข้อมูลบล็อก" })
            }
            res.json(blog)
        })
}





