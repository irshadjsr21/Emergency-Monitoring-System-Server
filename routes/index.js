const express = require('express');
const router = express.Router();

const controller = require('../controllers/index');
const adminRouter = require('./admin');

router.get('/status', controller.getStatus);
router.use('/admin', adminRouter);

module.exports = router;
