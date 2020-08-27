const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = db.user;

module.exports.login = function (req, res) {
    User.find({
        email: req.body.email
    }).exec()
    .then((user)=>{
        if(user.length == 0 ){
            res.status(500).send({message:"No account associated with this email."});
        }
        else{
            bcrypt.compare(req.body.password, user[0].password)
            .then(result=>{
                if(result===true){
                    let token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email,
                        postalCode: user[0].postalCode
                    }, config.secret, {expiresIn: 1800});
                    
                    res.status(200).send({
                        username: user.username,
                        accessToken: token
                    })
                }
                else{
                    res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password."
                    })
                    return;
                }
            })
        }
    })
}