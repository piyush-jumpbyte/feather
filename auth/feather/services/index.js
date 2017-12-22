const piyush = require('./piyush/piyush.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(piyush);
};
