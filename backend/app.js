const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const  cors = require('cors');

const routes = require('./routes/routes');

const allowedOrigin = 'https://track-your-finances-1.onrender.com';

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // if you use cookies or authentication
  })
);

app.use('/userroutes', routes);


const connecttodb = require('./db/db');
connecttodb();
app.get('/', (req, res) => {
    res.send('Hello Iam Finance Tracker Application!');
}
);  

module.exports = app;