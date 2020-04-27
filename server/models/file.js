const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    fileName: String,
    mimeType: String,
    fileSize: String,
    userId: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('File', fileSchema)