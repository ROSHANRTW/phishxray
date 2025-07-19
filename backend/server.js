const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB URI
const mongoURI = 'mongodb+srv://rathvaroshan23:Roshanxray@phishxray.75cshl5.mongodb.net/?retryWrites=true&w=majority&appName=Phishxray';

// Connect to MongoDB without deprecated options
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Port
const PORT = 8080;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
