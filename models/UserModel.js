// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     userName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//     },


// });

// const UserModel = mongoose.model('User', userSchema);

// module.exports = UserModel;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});



const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;