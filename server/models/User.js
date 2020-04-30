const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: String,
    email: String,
    role: {
       type: String,
       default: 'Regular'
    },
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model('User', userSchema)