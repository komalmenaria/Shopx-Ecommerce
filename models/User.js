const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator')


const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: [true, 'Enter enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']

    },
    password:{
        type:String,
        require:[true,'Enter a password'],
        minlength:[6,'Minimum length of password need to be 6']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user',UserSchema);