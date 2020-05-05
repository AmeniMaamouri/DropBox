
const File = require('../models/file');
var mongodb = require('mongodb');
const path = require('path')
var fs = require('fs');

module.exports = (req, res) => {
   
    File.findOneAndDelete({ _id: new mongodb.ObjectID(req.query.fileId)}, (err, data) => {
        var filePath = path.join(__dirname, `../uploads/${req.query.userId}/${data.fileName}`);
        fs.unlink(filePath, (err => {
            if(err) throw err
            res.json({
                message: 'Delete Success'
            })
        }))
    });


}   