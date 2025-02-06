const express = require('express');
const app = express();
const port = 3000;
const items = ['Apple', 'Banana', 'Orange'];

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;

    if (!newItem) {
        return res.status(400).json({ error: 'Item is required' });
    }

    items.push(newItem);  // Corrected
    res.json(items);
});

// Define a route for the about page
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Logging middleware 
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define a route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
