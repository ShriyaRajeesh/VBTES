const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();
const Transport = require('./models/Transport')
Transport.find().then(console.log)


// Enable CORS for frontend
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' // Replace with your production domain
    : 'http://localhost:5173', // Vite's default development port
  credentials: true
}));

app.use(express.json());

app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/operators', require('./routes/operators'));
app.use('/api/realtimeupdates', require('./routes/realtimeupdates'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/stops', require('./routes/stops'));
app.use('/api/transport', require('./routes/transport'));
app.use('/api/users', require('./routes/users'));
app.use('/api/voicequeries', require('./routes/voicequeries'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

