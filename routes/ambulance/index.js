const express = require('express');
const router = express.Router();

const controller = require('../../controllers/ambulance');
const auth = require('../../middlewares/authenticator');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/profile', auth.ambulance, controller.profile);

module.exports = router;
