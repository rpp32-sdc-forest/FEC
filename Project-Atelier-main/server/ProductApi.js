const axios = require('axios');
const gitToken = require('../config.js');

const getTotalProducts = (page) => {
  console.log('get totalproducts called');
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products?page=${page}&count=1000`,
    //url: 'http://localhost:8080/pro/products',
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      return response.data;
    })
    .catch((err) => {
      console.log('This is the getTotalProducts error: ', err);
    });
};

const getSpecificProduct = (productId) => {
  let options = {
    method: 'GET',
    //proxyurl: http:5000 --> go to proxy server aka proxy's iP address
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`,
    //url: `http://localhost:8080/pro/product/${productId}`
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

const getProductStyles = (productId) => {
  let options = {
    method: 'GET',
    //url: `http://localhost:8080/pro/product/${productId}/styles`
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

const getProductReviews = (productId) => {
  let options = {
    method: 'GET',
    //url: `http://localhost:8080/pro/product/${productId}`
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then((response) => {
      return response.data;
    });
};

module.exports = {
  getSpecificProduct,
  getProductStyles,
  getProductReviews,
  getTotalProducts,
};