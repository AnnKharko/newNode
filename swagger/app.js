const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const path = require('path');

const dotenv = require('dotenv');
const swaggerUI = require('swagger-ui-express');
const db = require('./dataBase/MySQL').getInstance();
const cronRun = require('./cron-jobs');
const { PORT } = require('./configs/config');
const apiRouter = require('./router/api.router');
const deleteTokens = require('./cron-jobs');
const Sentry = require('./logger/sentry');
const swaggerDoc = require('./docs/swagger.json');

dotenv.config({ path: path.join(process.cwd(), '../.env') });

const app = express();

db.setModels();

app.use(Sentry.Handlers.requestHandler());

app.use(morgan('dev'));
app.use(fileUpload());
app.use(express.static(path.join(process.cwd(), 'static')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/', apiRouter);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    Sentry.captureException(err);

    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
    cronRun(deleteTokens());
});
