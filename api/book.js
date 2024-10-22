let bookedSeats = [5, 6, 20]; // Initialize booked seats

export default (req, res) => {
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

  // Book the seats
  let seatsToBook = availableSeats.slice(0, requestedSeats.length);
  bookedSeats = [...bookedSeats, ...seatsToBook];
  res.status(200).json({ bookedSeats: seatsToBook });
};
