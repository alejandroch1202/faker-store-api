const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

// This allow to receive json in body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('My first express server');
});

routerApi(app);

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});
