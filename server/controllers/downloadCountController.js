const File = require('../models/file')
var mongodb = require('mongodb');
module.exports = (req,res) => {
  var id = req.params.id

  File.findOneAndUpdate(
    {_id: id},{$inc: { 'downloadNumber': 1}},{ new: true }
).then(file => {
    res.json({
        message: 'Updated'
    })
})
   
}