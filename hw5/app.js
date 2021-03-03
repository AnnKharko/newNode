const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const apiRouter = require('./router/api.router');

const app = express();

// eslint-disable-next-line no-use-before-define
_connectDB();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
    console.log(__dirname);
});

function _connectDB() {
    mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', (error) => {
        console.log(error);
    });
}
