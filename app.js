const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const flash = require('connect-flash')
const session = require('express-session')
const crypto = require('crypto')
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user');
const Users = require('./models/users');



const methodOverride = require('method-override');

connectDB();

//check 
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true
    }
}));

app.use(flash());


// Set the view engine to EJS
app.set('view engine', 'ejs');


// database
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use method-override to allow PUT and DELETE methods in forms
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));




// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Example route for the homepage


app.get('/index', (req, res) => {
    res.render('index'); // This will render "views/index.ejs"
});






//for about

app.get('/about', async (req, res) => {
    try {
        const users = await Users.find(); 
        res.render('about', { users }); 
    } catch (error) {
        console.error('Error fetching users for About page:', error);
        res.status(500).send('Internal Server Error');
    }
});


//for logout
app.post('/logout', (req, res) => {
    console.log('Logout route hit');

    // Set the flash message before destroying the session
    req.flash('success_msg', 'Logged out successfully.');

    req.session.destroy((err) => {
        if (err) {
            console.error('Session destruction error:', err);
            req.flash('error_msg', 'Unable to log out. Please try again.');
            return res.redirect('/error');
        }

        res.redirect('/');  // Redirect after setting flash message
    });
});






app.get('/almuin', (req, res) => {
    res.render('almuin');
});

app.get('/news', (req, res) => {
    res.render('news')
});



app.get('/', (req, res) => {
    // Render the login page and pass the flash messages
    res.render('login', { messages: req.flash() });
});

    







app.post('/register', (req, res) => {
    // After successful registration
    res.render('login', { messages: { success_msg: 'Admin registered successfully!' } });
});


app.get('/register', (req, res) => {
    res.render('register');
})


//for admin
app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);







// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
