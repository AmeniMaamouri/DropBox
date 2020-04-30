const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UploadFileController = require('./controllers/UploadFileController');
const upload = require('express-fileupload')
const filesUploadedController = require('./controllers/filesUploadedController')
const http = require('http');
const socketio = require('socket.io');
const DownloadFileController = require('./controllers/DownloadFileController')
const registerController = require('./controllers/registerController')
const loginController = require('./controllers/loginController')
const deleteFileController = require('./controllers/deleteFileController')
const downloadCountController = require('./controllers/downloadCountController')
const rateLimit = require("express-rate-limit");

mongoose.connect('mongodb://localhost:27017/DropBox', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})


const createAccountLimiter = rateLimit({

    
    windowMs: 1 * 60 * 1000, // 1 min window
    max: 2, // start blocking after 5 requests
    skip: (req,res) => {
        
        console.log(req.query.role)
        if(req.query.role == "Regular"){
            return false
        }else {
            return true
        }
    },
    message: {
        error: "You have reached your limit, please try again after 1min",
       }
  });

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(upload())
app.use('/public', express.static('public'));

const fileUploaded = (data) => {
    return io.emit('fileUploaded', data)
}

app.post('/' , UploadFileController )
app.get('/' , filesUploadedController )
app.get('/download/:id' , createAccountLimiter , DownloadFileController )
app.post('/signup', registerController)
app.post('/signin', loginController)
app.delete('/', deleteFileController)
app.put('/download/:id', downloadCountController)

server.listen(4000, () => console.log('Server is running on port 4000'));


module.exports.fileUploaded = fileUploaded;