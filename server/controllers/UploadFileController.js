const File = require('../models/file');
const index = require('../index');


module.exports = (req, res) => {

   var user = JSON.parse(req.body.user)

    function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}

    if (req.files){
       
            var file = req.files.file
            var fileName = file.name
        
            file.mv('./uploads/' + fileName, (err) => {
                if (err) {
                    console.log(err)
                } else {
        
                    File({
                        fileName,
                        fileSize: formatBytes(file.size),
                        mimeType: file.mimetype,
                        userId: user.userId
        
                    }).save((err,data) => {
        
                        res.json({
                            status: 200,
                            msg: 'Uploaded Completed',
                        })
                        
                        if (err) console.log(err)
                        index.fileUploaded(data)
                        
                    });
        
                    
                }
            })
      
   
}
}