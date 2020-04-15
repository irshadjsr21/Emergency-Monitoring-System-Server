const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');
const adminRouter = require('./admin');
const hospitalRouter = require('./hospital');
const ambulanceRouter = require('./ambulance');

router.get('/status', controller.getStatus);
router.use('/admin', adminRouter);
router.use('/hospital', hospitalRouter);
router.use('/ambulance', ambulanceRouter);

module.exports = router;
