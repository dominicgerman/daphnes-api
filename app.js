const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const recipeRouter = require('./routes/recipeRoutes');
const userRouter = require('./routes/userRoutes');
// const searchRouter = require('./routes/searchRoute');

const app = express();

// 1) GLOBAL MIDDLEWARE
// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin
app.options('*', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour.',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // gives access to the body on the post route; limit option limits the body to 10kb

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution -- ADD MORE PARAMS TO THIS WHITELIST EVENTUALLY
app.use(
  hpp({
    whitelist: ['ingredients', 'finalVolume', 'difficulty'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// TEST middleware
app.use((req, res, next) => {
  next();
});

app.use(compression());

// 2) ROUTE HANDLERS (controllers)
// (they now live in the controllers folder)

// 3) ROUTES
// this is where we "mount" our routers
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/search', searchRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// 4) SERVER
// lives in the server module

module.exports = app;
