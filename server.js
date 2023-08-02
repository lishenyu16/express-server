const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const router = require('./routes');
const winston = require('./routes/middleware/logger');

app.disable('x-powered-by');
app.use(cors());
app.set('true proxy', true);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream }));

app.use('/static', express.static('public')); //e.g: http://localhost:3000/static/images/kitten.jpg
app.use(express.static(path.join(__dirname, 'views')));

router(app);
app.use('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send('User-agent: *\nDisallow: /');
});

app.get('/*', (req, res) => {
  return res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

app.listen(port, () => {
  console.log(`Server is listening to ${port}.`);
});

