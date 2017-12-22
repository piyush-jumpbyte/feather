const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const service = require('feathers-mongoose');
const mongoose = require('mongoose');
const routes = require('./server/routes');
const schema = require('./server/database.schema');
const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const app = express(feathers());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.configure(express.rest());

mongoose.connection.openUri('mongodb://localhost/auth', ()=>{
  console.log('connected successfully');
})
mongoose.Promise = global.Promise;

var flag = 0;
const validate = async context => {
  
  console.log();
  schema.loginModel.findOne({email:context.data.email,password:context.data.password}).then((model,error)=>{
    if(model){
      console.log('login successful!')
      flag=1;
    }
    else{
      console.log('invalid credential :(');
      flag=1;
    }
    
  });
  
};
const remove = async context => {
  if(flag==1){
    schema.loginModel.findOneAndRemove({email:context.data.email}).then((model,error)=>{
      if(model){
        console.log('done');
        flag=0;
      }
    });
    
  }
}

app.use('/todo', service({
  Model: schema.todoModel
}));

app.use('/login', service({
  Model: schema.loginModel
}));

app.use('/register',service({
  Model: schema.loginModel
}))

app.service('register').hooks({
  after: {
    create: [
      local.hooks.protect('password')
    ]
  }
});

app.service('login').hooks({
  before: {
    
    create: validate
  },
  after: {
    all: [
      local.hooks.protect('password')
    ],
    create: remove
  }
});

// routes.setup(app);

app.listen(8080, ()=>{
  console.log('server started at 8080');
})

// class CustomVerifier extends oauth2.Verifier {
  
//   // The verify function has the exact same inputs and 
//   // return values as a vanilla passport strategy
//   verify(req, accessToken, refreshToken, profile, done) {
//     // do your custom stuff. You can call internal Verifier methods
//     // and reference this.app and this.options. This method must be implemented.

//     // the 'user' variable can be any truthy value
//     // the 'payload' is the payload for the JWT access token that is generated after successful authentication
//     done(null, user, payload);
//   }
// }

// app.configure(authentication({
//   strategy: 'local',
//   secret: 'superSecret'
//   // email: 'admin@feathersjs.com',
//   // password: 'admin'
// }));

// app.configure(oauth2({
//   name: 'google',
//   Strategy: GoogleStrategy,
//   clientID: '354679112216-52g52e5r2o6n4njikaesg638n2u70ncc.apps.googleusercontent.com',
//   clientSecret: 'wJDCUqHdthTWOcXm-QlaouTx',
//   callbackURL: "http://localhost:3030/redirect",
//   scope: ['profile', 'email'],
//   service: 'oauth2',
//   Verifier: CustomVerifier
// }));

// app.configure(jwt());

// app.service('authentication').hooks({
//   before: {
//     create: [
//       authentication.hooks.authenticate(['jwt'])
//     ]
//   }
// });

// app.service('oauth2').hooks({
//   before: {
//     create: [customizeGoogleProfile()],
//     update: [customizeGoogleProfile()]
//   }
// });

// function customizeGoogleProfile() {
//   return function(context) {
//     console.log('Customizing google Profile');
//     // If there is a google field they signed up or
//     // signed in with google so let's pull the primary account email.
//     if (context.data.google) {
//       context.data.email = context.data.google.profile.emails.find(email => email.primary).value;
//     }

//     // If you want to do something whenever any OAuth
//     // provider authentication occurs you can do this.
//     if (context.params.oauth) {
//       // do something for all OAuth providers
//     }

//     if (context.params.oauth.provider === 'google') {
//       // do something specific to the google provider
//     }

//     return Promise.resolve(context);
//   };
// }