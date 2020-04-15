const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin');
const auth = require('../../middlewares/authenticator');
const ambulanceRouter = require('./ambulance');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/verify', controller.verify);
router.get('/profile', auth.admin, controller.profile);
router.use('/ambulance', auth.admin, ambulanceRouter);

module.exports = router;
