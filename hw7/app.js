const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// require('dotenv').config();
const dotenv = require('dotenv');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const { MONGO_URL, PORT } = require('./configs/config');
const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
            // isPublic: false
        });
});

app.listen(PORT, () => {
    console.log('App listen 5000');
});

function _connectDB() {
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
