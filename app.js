const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Example route for the homepage


app.get('/index', (req, res) => {
    res.render('index'); // This will render "views/index.ejs"
});
app.get('/about', (req, res) => {
    res.render('about');

});

app.get('/almuin', (req, res) => {
    res.render('almuin');
});

app.get('/credits', (req, res) => {
    res.render('credits')
});
app.get('/', (req, res) => {
    res.render('login');
})
app.get('/register',(req,res)=>{
    res.render('register');
})


// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
