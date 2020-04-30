const File = require('../models/file')

module.exports = (req,res) => {
    const userId = req.query[0]
   
    File.find({userId: userId}, (err,data) => {
        res.json(data)
    }).sort({createdAt: -1});
}