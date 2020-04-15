const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');
const adminRouter = require('./admin');
const ambulanceRouter = require('./ambulance');
const hospitalRouter = require('./hospital');

router.get('/status', controller.getStatus);
router.use('/admin', adminRouter);
router.use('/ambulance', ambulanceRouter);
router.use('/hospital', hospitalRouter);

module.exports = router;
