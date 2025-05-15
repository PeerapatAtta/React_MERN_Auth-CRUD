//Connect database
// exports.create = (req, res) => {
//     res.json({ data: "message from server - blogController" });
// }
const slugify = require('slugify');

//Save data
exports.create = (req, res) => {
    const { title, content, author} = req.body
    const slug = slugify(req.body.slug)

    res.json({ 
        data: { title, content, author, slug }
    });
}

//localhost:8000/api/blog/create
