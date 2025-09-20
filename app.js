const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('home', { 
        title: 'Joel Torres - Home',
        currentPage: 'home'
    });
});

app.get('/about', (req, res) => {
    res.render('about', { 
        title: 'Joel Torres - About Me',
        currentPage: 'about'
    });
});

app.get('/mission', (req, res) => {
    res.render('mission', { 
        title: 'Joel Torres - Mission',
        currentPage: 'mission'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', { 
        title: 'Joel Torres - Projects',
        currentPage: 'projects'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Joel Torres - Contact',
        currentPage: 'contact'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});