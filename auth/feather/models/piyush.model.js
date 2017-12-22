// piyush-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const piyush = new mongooseClient.Schema({
  
  
    googleId: { type: String },
  
  }, {
    timestamps: true
  });

  return mongooseClient.model('piyush', piyush);
};
