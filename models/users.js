const mongoose = require('mongoose');
// const User = require('./models/users');

// Define the User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    photo: {
        type: String, // Store the file path or URL of the photo
        required: false,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the User model
const Users = mongoose.model('User', UserSchema);

module.exports = Users;
