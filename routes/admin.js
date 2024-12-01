const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
require('dotenv').config();

// Predefined list of allowed emails
// const allowedRegister = ['sp22-bcs-113']; // Add the specific emails here


const allowedRegister = process.env.ALLOWED_REGISTER
    // ? process.env.ALLOWED_REGISTER.split(',')
    // : [];

// console.log('Allowed Register:', allowedRegister);

// // Admin registration route
// router.post('/register', async (req, res) => {
//     try {
//         const { register, password } = req.body;

//         // Check if the email is in the allowed list
//         if (!allowedRegister.includes(register)) {
//             // res.render('login', { messages: { success_msg: 'You are not allowed to register' } });
//             return res.status(400).render('register', {
            
//                 messages: { error_msg: 'You are not allowed to register.' }
               
              
//             });
//         }

//         // Check if the email is already registered
//         const existingAdmin = await Admin.findOne({ register });
//         if (existingAdmin) {
//             return res.status(400).render('register', {
//                 messages: { error_msg: 'Email already registered. Please use a different email.' }
//             });
//         }

//         // Create new admin and save
//         const newAdmin = new Admin({ register, password });
//         await newAdmin.save();

       
//         // res.status(201).redirect('/?success_msg=Admin registered successfully! Login Here ');
//         res.render('login', { messages: { success_msg: 'Admin registered successfully!' } });

//     } catch (err) {
//         res.status(400).render('register', {
//             messages: { error_msg: `Error: ${err.message}` }

//         });

//     }




// });



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
