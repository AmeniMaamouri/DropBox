const File = require('../models/file')

module.exports = (req,res) => {
    const userId = JSON.stringify(req.query[0])
    File.find({userId: userId}, (err,data) => {
        res.json(data)
    }).sort({createdAt: -1});
}