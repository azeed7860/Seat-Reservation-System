const express = require('express');
const cors = require('cors');
const path = require('path'); // Add this

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Pre-booked seats (can be stored in a database in production)
let bookedSeats = [5, 6, 20];

// API endpoint to get the current booked seats
app.get('/api/seats', (req, res) => {
    res.json({ bookedSeats });
});

// API endpoint to book seats
app.post('/api/book', (req, res) => {
    const { requestedSeats } = req.body;
    if (!requestedSeats || requestedSeats.length > 7 || requestedSeats.length <= 0) {
        return res.status(400).json({ error: 'Invalid number of seats requested' });
    }

    // Find available seats
    let availableSeats = [];
    for (let i = 1; i <= 80; i++) {
        if (!bookedSeats.includes(i)) {
            availableSeats.push(i);
        }
    }

    if (availableSeats.length < requestedSeats.length) {
        return res.status(400).json({ error: 'Not enough seats available' });
    }

    // Book the seats (for simplicity, taking the first available)
    let seatsToBook = availableSeats.slice(0, requestedSeats.length);
    bookedSeats = [...bookedSeats, ...seatsToBook];
    res.json({ bookedSeats: seatsToBook });
});

// Listen for requests on the defined port
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
