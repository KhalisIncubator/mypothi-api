const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cacheControl = require('express-cache-controller');
// const { createPool, createPoolCluster } = require('mariadb');
const { createPool } = require('mariadb');

// const config = require('./api/config');
const routes = require('./api/routes');

const app = express();
const port = process.env.NODE_ENV === 'development' ? '3001' : '3000';

// database
// if (config.length > 1) {
//   const dbCluster = createPoolCluster();
//   config.forEach(dbConfig => dbCluster.add(dbConfig.host, dbConfig));
//   app.locals.pool = dbCluster.of(/.*?/, 'ORDER');
// } else {
//   app.locals.pool = createPool(config[0]);
// }
const metadata = {
  user: process.env.DB_USER || 'root',
  // password: process.env.DB_PASSWORD || 'root',
  database: 'mypothi_pothi',
  dateStrings: true,
  compress: true,
  acquireTimeout: 6000,
  connectionLimit: process.env.DB_POOL_SIZE || 2,
  host: '127.0.0.1',
  port: 3306,
};
app.locals.pool = createPool(metadata);

// app
app.use(cors());
app.use(cacheControl({ maxAge: 21600 }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);

app.use((req, res) => {
  res.cacheControl = { noCache: true };
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

app.listen(port, () => {
  console.log(`BaniDB API start on port ${port}`);
});

module.exports = app;
