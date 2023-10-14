const os = require('os');
const { Router } = require('express');

const limiter = require('../controllers/limiter.js');
const pjson = require('../../package.json');
const pages = require('../controllers/pages');
const layout = require('../controllers/layout');

// const metadata = require('../controllers/metadata');
// const healthcheck = require('../controllers/healthcheck');

const route = Router();
route.get('/', limiter.rate100, (req, res) => {
  res.json({
    name: 'MyPothi API',
    version: pjson.version,
    documentation: 'N/A',
    'terms-of-service': 'N/A',
    'data-license': 'N/A',
    endpoint: os.hostname().slice(0, 3),
  });
});

// Healthcheck Routes
// route.get('/health', limiter.rate250, healthcheck.db);

// layout methods
route.get('/layout/:memberid', limiter.rate250, layout.getLayout);

// folder methods
// route.patch()
// route.delete()

// page methods
route.get('/page/:memberid/:pageid', limiter.rate250, pages.getPage);
route.post('page/new/:memberid/:pageid', limiter.rate250, pages.createPage);
route.patch('page/edit/:memberid/:pageid', limiter.rate250, pages.updatePage);
route.delete('page/delete/:memberid/:pageid', limiter.rate250, pages.deletePage);
module.exports = route;
