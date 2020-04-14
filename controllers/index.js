const createController = require('./createController');

module.exports = {
  getStatus: createController(async (req, res) => {
    res.json({ status: 'Online' });
  }),
};
