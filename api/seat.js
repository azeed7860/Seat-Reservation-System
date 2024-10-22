export default (req, res) => {
  const bookedSeats = [5, 6, 20]; // Pre-booked seats
  res.status(200).json({ bookedSeats });
};
