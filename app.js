const express = require('express');
const app = express();
const port = 3000;

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospitalDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB Schema and Model (Patient example)
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    diagnosis: String
});

const Patient = mongoose.model('Patient', patientSchema);

//Serve static files (HTML, CSS)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.get('/patients', (req, res) => {
    // Fetch patient data from MongoDB
    Patient.find({}, (err, patients) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(patients);
        }
    });
});

// Add more routes for doctors, appointments, etc.

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
