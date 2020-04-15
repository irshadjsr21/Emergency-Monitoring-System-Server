const express = require('express');
const router = express.Router();

const controller = require('../../controllers/admin/hospital');

router.post('/', controller.create);

module.exports = router;
