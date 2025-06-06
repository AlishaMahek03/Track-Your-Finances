const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const  cors = require('cors');

const routes = require('./routes/routes');

const allowedOrigin = ['https://track-your-finances-1.onrender.com', 'http://localhost:3000', 'https://track-your-finances.onrender.com'];

app.use(express.json());
app.use(
  cors()
);

app.use('/userroutes', routes);


const connecttodb = require('./db/db');
connecttodb();
app.get('/', (req, res) => {
    res.send('Hello Iam Finance Tracker Application!');
}
);  

module.exports = app;