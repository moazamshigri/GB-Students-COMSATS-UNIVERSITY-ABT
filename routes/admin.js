const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
require('dotenv').config();




const allowedRegister = process.env.ALLOWED_REGISTER




router.post('/register', async (req, res) => {
    try {
        const { register, password } = req.body;

        if (!register || !password) {
            return res.status(400).render('register', {
                messages: { error_msg: 'Registration number and password are required.' }
            });
        }

        if (!allowedRegister.includes(register)) {
            return res.status(400).render('register', {
                messages: { error_msg: 'You are not allowed to register.' }
            });
        }

        const existingAdmin = await Admin.findOne({ register });
        if (existingAdmin) {
            return res.status(400).render('register', {
                messages: { error_msg: 'Registration number already registered.' }
            });
        }

        const newAdmin = new Admin({ register, password });
        await newAdmin.save();

        res.render('login', { messages: { success_msg: 'Admin registered successfully!' } });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).render('register', {
            messages: { error_msg: `Error: ${err.message}` }
        });
    }
});


module.exports = router;
