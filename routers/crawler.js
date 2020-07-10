const express = require('express');
const router = express.Router();
const CrawlerController = require('../controllers/CrawlerController')

router.use('', CrawlerController.startCraw);

module.exports = router;