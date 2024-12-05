const mongoose = require('mongoose');


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
        type: String, 
        required: false,
    },
}, {
    timestamps: true, 
});


const Users = mongoose.model('User', UserSchema);

module.exports = Users;


