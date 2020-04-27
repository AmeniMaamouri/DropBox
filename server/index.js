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

mongoose.connect('mongodb://localhost:27017/DropBox', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})


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
app.get('/download/:id' , DownloadFileController )
app.post('/signup', registerController)
app.post('/signin', loginController)
app.delete('/', deleteFileController)

server.listen(4000, () => console.log('Server is running on port 4000'));


module.exports.fileUploaded = fileUploaded;