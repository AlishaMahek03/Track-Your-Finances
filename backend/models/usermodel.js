const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
    });

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}   

UserSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}   

const User = mongoose.model('User', UserSchema);
module.exports = User;