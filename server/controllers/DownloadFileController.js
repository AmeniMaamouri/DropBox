const path = require('path')
const File = require('../models/file')

module.exports = (req, res) => {

  if (req.params.id !== 'undefined') {
    File.findById(req.params.id, (err, data) => {
      if (data) {
        var filePath = path.join(__dirname, '../uploads/') + data.fileName;
        res.setHeader('cache-control', data.fileName)
        res.download(filePath, data.fileName)
      }else{
        res.end()
      }
    })
  }
  
}