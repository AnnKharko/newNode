const express = require('express');
const fileUpload = require('express-fileupload');
// const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// require('dotenv').config();
const dotenv = require('dotenv');
const db = require('./dataBase/MySQL').getInstance();
const cronRun = require('./cron-jobs');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

db.setModels();

const { PORT } = require('./configs/config');
const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
// _connectDB();

app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static(path.join(process.cwd(), 'static')));
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
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun();
});
