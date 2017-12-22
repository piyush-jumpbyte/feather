// Initializes the `piyush` service on path `/piyush`
const createService = require('feathers-mongoose');
const createModel = require('../../models/piyush.model');
const hooks = require('./piyush.hooks');
const filters = require('./piyush.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'piyush',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/piyush', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('piyush');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
