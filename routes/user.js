const express = require('express');
const router = express.Router();
const multer = require('multer');
const Users = require('../models/users'); // Import the User schema
const methodOverride = require('method-override');

router.use(methodOverride('_method'));


// Configure Multer for file uploads with validations
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter,
});

// Route to add a user
router.post('/', upload.single('user_avatar'), async (req, res) => {
    const { username, department, semester } = req.body;


    if (!username || !department || !semester) {
        req.flash('error_msg', 'Please provide all required fields');
        return res.redirect('/user');
    }
   

    const photo = req.file ? `/uploads/${req.file.filename}` : 'No photos';

    const newUser = new Users({ name: username, department, semester, photo });


    await newUser.save();
    req.flash('success_msg', 'User added successfully!');
    res.redirect('/user');
});

// Error handling middleware
router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        req.flash('error_msg', 'File upload error: ' + err.message);
        return res.redirect('/user');
    } else if (err) {
        req.flash('error_msg', 'Error: ' + err.message);
        return res.redirect('/user');
    }
    next();
});




//flash message
router.get('/', async (req, res) => {
    const users = await Users.find();
    const success_msg = req.flash('success_msg');
    const error_msg = req.flash('error_msg'); 
    res.render('user', { users, success_msg, error_msg });
});


// Route to delete a user

router.post('/delete/:id', async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id); // Deletes user by ID
        req.flash('success_msg', 'User deleted successfully!');
        res.redirect('/user');
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'Error deleting user.');
        res.redirect('/user');
    }
});



module.exports = router;


