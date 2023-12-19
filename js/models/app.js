const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ContactUs = require('./models/contactUs');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://<your-mongodb-url>', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
// app.use(express.static('public'));

// Handle POST requests to '/contact'
app.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create a new ContactUs document
        const newContact = new ContactUs({
            name,
            email,
            message
        });

        // Save the document to the database
        await newContact.save();

        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
