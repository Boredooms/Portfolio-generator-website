import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

import apiRoutes from './routes/api';

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Portfolio Platform API Running');
});

// Basic MongoDB connection
if (process.env.MONGO_URI) {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.error('MongoDB Connection Error:', err));
} else {
    console.log('MONGO_URI not found in .env, skipping database connection');
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
