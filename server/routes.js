var mongoose = require('mongoose');
const schema = require('./database.schema');

const feather = {
  
}

feather.setup = (app)=> {

  app.use('/todo', service({
    Model: schema.todoModel
  }));

}

module.exports = feather;