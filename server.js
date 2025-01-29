const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const bodyparser=require('body-parser')

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});