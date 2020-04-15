const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin');
const auth = require('../../middlewares/authenticator');
const ambulanceRouter = require('./ambulance');
const hospitalRouter = require('./hospital');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/verify', controller.verify);
router.get('/profile', auth.admin, controller.profile);
router.use('/ambulance', auth.admin, ambulanceRouter);
router.use('/hospital', auth.admin, hospitalRouter);

module.exports = router;
