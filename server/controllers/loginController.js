const User = require('../models/User')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, same) => {
                if (same) {

                    var payload = {
                        userId: user._id
                    }

                    res.json({
                        status: 200,
                        message: 'Login success',
                        userToken: jwt.sign(payload, '3023b0f5ec57', {
                            expiresIn: '1h'
                        })
                    })
                } else {
                    res.json({
                        message: 'Email or password incorrect',
                    })
                }
            })


        } else {
            res.json({
                message: 'Email or password incorrect',
            })

        }
    }).catch(err => {
        res.json({

            message: 'Error occured, try again',
            status: 500,
            success: false

        });
    })
}