const db = require('../models');
const bcrypt = require('bcryptjs');
const User = db.user;

module.exports.checkDuplicate = function (req, res, next) {
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }

            next();
        });
    });
};

module.exports.registerUser = function (req, res, next) {

    if (req.body.password != req.body.password2){
        res.send({message: "Passwords do not match"});
        return;
    }

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: "",
        address: req.body.address,
        postalCode: req.body.postalCode,
        phone: req.body.phone
    });

    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        newUser.password = hash;

        newUser.save((err) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "User registered." });
        });
    })
    .catch({message: "error"});

    next();
}



