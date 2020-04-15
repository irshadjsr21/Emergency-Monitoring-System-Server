const crypto = require('crypto');
const { HASH } = require('../config');

const HASH_SECRET = HASH.SECRET;

module.exports = {
  sha256(text) {
    return crypto
      .createHmac('sha256', HASH_SECRET)
      .update(text.toString())
      .digest('hex');
  },

  sha512(text) {
    return crypto
      .createHmac('sha512', HASH_SECRET)
      .update(text.toString())
      .digest('hex');
  },
};
