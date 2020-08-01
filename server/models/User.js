const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
});
userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

const validateUser = user => {
    const schema = {
        name: Joi.string().required().min(5).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(255)
    };
    return Joi.validate(user, schema);
};

module.exports.User = User;
module.exports.validate = validateUser;
