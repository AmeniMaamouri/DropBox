const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {

    User.findOne({email : req.body.email}, (err,user) => {
        if(user){
            res.json({
                message: 'Email already exist',
                status: 200,
                success: false
            })
        }else {
            req.body.password = bcrypt.hashSync(req.body.password , 12);
            User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }).save((err,data) => {
                res.json({
                    message: 'Account Created Successfully',
                    status: 201,
                    success: true
                })
            })
        }
    })

}