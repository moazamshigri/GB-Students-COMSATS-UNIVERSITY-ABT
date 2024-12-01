const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // Admin schema





// Admin login route
router.post('/', async (req, res) => {
    try {
        const { register, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ register });

        // Check if admin exists and password matches
        if (!admin || admin.password !== password) {
            return res.status(401).render('login', { error: 'Invalid email or password' });
        }

        // If credentials are correct, render user.ejs
        req.flash('success_msg', 'Wellcome Admin page! Login successful!');

        res.redirect('user');

    } catch (err) {
        console.error(err);
        res.status(500).render('login', { error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
