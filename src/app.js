'use strict';

require('dotenv').config();
const express = require('express');
let request = require('request');
let querystring = require('querystring');
// const morgan = require('morgan');
// const cors = require('cors');
// const helmet = require('helmet');
// const { NODE_ENV } = require('./config');

const app = express();

let redirect_uri = 
  process.env.REDIRECT_URI || 
  'http://localhost:8888/callback';

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email user-top-read playlist-modify-public',
      redirect_uri
    }));
});

app.get('/callback', function(req, res) {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/redirect';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

// const morganOption = (NODE_ENV === 'production')
//   ? 'tiny'
//   : 'common';

// app.use(morgan(morganOption));
// app.use(cors());
// app.use(helmet());

// app.get('/', (req, res) => {
//   res.send('Hello, world');
// });

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === 'production') {
//     response = { error: { message: 'server error'} };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });

module.exports = app;