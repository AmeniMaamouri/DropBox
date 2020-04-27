
const File = require('../models/file');
var mongodb = require('mongodb');
const path = require('path')
var fs = require('fs');

module.exports = (req, res) => {

    File.findOneAndDelete({ _id: new mongodb.ObjectID(req.query[0])}, (err, data) => {
        var filePath = path.join(__dirname, '../uploads/') + data.fileName;
        fs.unlink(filePath, (err => {
            if(err) throw err
            res.json({
                message: 'Delete Success'
            })
        }))
    });


}   