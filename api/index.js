const express = require('express');
const path = require('path');
const cors = require('cors');
const routerApi = require('./routes');
const { errorLogger, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public/')));
routerApi(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}/api/v1`);
});
