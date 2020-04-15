const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin');
const auth = require('../../middlewares/authenticator');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/verify', controller.verify);
router.get('/profile', auth.admin, controller.profile);

module.exports = router;
