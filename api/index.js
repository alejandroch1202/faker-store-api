const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
// const whitelist = ['http://localhost:3000', 'http://localhost:5500'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed'));
//     }
//   },
// };

app.get('/api/v1', (req, res) => {
  res.send('My first express server');
});

// This allow to receive json in body
// app.use(cors(options));
app.use(cors());
app.use(express.json());
routerApi(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}/api/v1`);
});
