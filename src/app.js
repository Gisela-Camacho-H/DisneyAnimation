const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const {auth, requiresAuth} = require('express-openid-connect');
require('dotenv').config();

const config = {
     authRequired: false,
     auth0Logout: true,
     baseURL: process.env.BASE_URL,
     clientID: process.env.CLIENT_ID,
     issuerBaseURL: process.env.ISSUER_BASE_URL,
     secret: process.env.SECRET
   };

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
  })
  .use('/', require('./routes'));
 app.use(auth(config));

 app.get('/', (req, res) => {
     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
   });
 app.get('/profile', requiresAuth(), (req , res) => {
   res.send(JSON.stringify(res.oidc.user));
 });


  process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
