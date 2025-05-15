//Connect database
// exports.create = (req, res) => {
//     res.json({ data: "message from server - blogController" });
// }

//Save data
exports.create = (req, res) => {
    res.json({ data: req.body });
}
