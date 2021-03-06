const nodemon = require('nodemon');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 8080;
app.use(cors());

// app.get( collect all get requests) -> {
// find the route that came after the ip address
// if req.orginUrl has ratings --> use mer backend ip
// if it had pro --> use joe backend ip

app.get('/ratings', (req, res) => {
  console.log('req', req.originalUrl);
  var path = req.originalUrl;
  var url = 'http://54.147.168.66:3030' + path;
  let options = {
    method: 'GET',
    url: url
  };
  return axios(options)
    .then(response => {
    // console.log('response in proxy get', response.data)
      res.send(response.data).status(200);
    })
    .catch(err => console.log('error in proxy get', err));
});

app.use(createProxyMiddleware('/qna', { target: 'http://54.89.22.70:3001' }));

app.get('*', (req, res) => {
  console.log('req', req.originalUrl);
  var path = req.originalUrl;
  var url = 'http://ec2-3-93-24-196.compute-1.amazonaws.com:8080' + path;
  let options = {
    method: 'GET',
    url: url
  };
  return axios(options)
    .then(response => {
    // console.log('response in proxy get', response.data)
      res.send(response.data).status(200);
    })
    .catch(err => console.log('error in proxy get'));
});




app.put('*', (req, res) => {
  var path = req.originalUrl;
  var url = 'http://localhost:5000' + path;
  var options = {
    method: 'PUT',
    url: url
  };
  return axios(options)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('err in app.put proxy', err);
      res.sendStatus(500);
    });
});

app.post('*', (req, res) => {
  console.log('req.data', req.body);
  var path = req.originalUrl;
  var url = 'http://localhost:5000' + path;
  var options = {
    method: 'POST',
    url: url,
    data: req.body
  };
  return axios(options)
    .then(response => {
      console.log('successful post proxy');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in post proxy', err);
      res.sendStatus(500);
    });
});

app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
});