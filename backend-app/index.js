const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const authRoute = require('./routes/auth');

dotenv.config();

mongoose
    .connect(process.env.mongoURI,
        { useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true})
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log(err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:3000'],
    credentials: true
}));

app.use('/user', authRoute);

app.listen(5000, ()=> console.log('Server running'));