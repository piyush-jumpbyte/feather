const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const service = require('feathers-mongoose');
const mongoose = require('mongoose');
const routes = require('./server/routes');
const schema = require('./server/database.schema');


const app = express(feathers());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.configure(express.rest());

mongoose.connection.openUri('mongodb://localhost/auth', ()=>{
  console.log('connected successfully');
})
mongoose.Promise = global.Promise;

app.use('/todo', service({
  Model: schema.todoModel
}));

// routes.setup(app);

app.listen(8080, ()=>{
  console.log('server started at 8080');
})