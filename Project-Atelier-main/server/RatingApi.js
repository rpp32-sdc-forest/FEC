const axios = require('axios');
const gitToken = require('../config.js');
const url = 'http://localhost:8080';


const getTotalReviews = (productId, page) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${productId}&count=50&sort=relevant&page=${page}`,
    // url: 'http://localhost:5000/ratings/28',
    // url: 'http://localhost:8080/ratings/reviews/50'
    // url: `http://localhost:5000/ratings/${productId}`,
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      //console.log('get Reviews res', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the getTotalReviews error: ', err);
    });
};
const updateHelpfulness = (reviewId) => {
  // console.log('reviewId in server', reviewId);
  let options = {
    method: 'PUT',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/helpful`,
    // url: `http://localhost:5000/helpful/${reviewId}`
    //url: `http://localhost:8080/ratings/helpful/${reviewId}`
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('response', response);
      return response;
    })
    .catch((err) => {
      console.log('This is the updateHelpfulness error: ', err);
    });
};

const updateReported = (reviewId) => {
  let options = {
    method: 'PUT',
    // url: `http://localhost:5000/report/${reviewId}`
    url: `http://localhost:8080/ratings/report/${reviewId}`
    // url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${reviewId}/report`,
    // headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      return response;
    })
    .catch((err) => {
      console.log('This is the updateReported error: ', err);
    });
};

const ratingOverview = (productId) => {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta?product_id=${productId}`,
    // url: 'http://localhost:5000/characteristics/18',
    //url: 'http://localhost:8080/ratings/characteristics/50'
    // url: 'http://174.129.180.103:5000/ratings/characteristics/50'
    headers: { Authorization: gitToken.Token },
  };
  return axios(options)
    .then(response => {
      // console.log('response in server', response.data);
      //parse
      // response = JSON.parse(response.data);
      // console.log('parsed response', response);
      return response.data;
    })
    .catch((err) => {
      console.log('This is the ratingOverview error: ', err);
    });
};

const postReview = async (body) => {
  console.log('post review body in server', body);
  let params = {
    'product_id': body.productId,
    'rating': body.rating,
    'summary': body.reviewSummary,
    'body': body.reviewBody,
    'recommend': body.recommended === 'true',
    'name': body.nickName,
    'email': body.email,
    'photos': body.imgUrl.slice(),
    'characteristics': {}
  };
  let chars = body.Chars;
  for (let i = 0; i < chars.length; i++) {
    if (chars[i].Id) {
      params['characteristics'][chars[i].Id] = chars[i].val;
    }
  }
  console.log('params', params);
  let options = {
    method: 'POST',
    // url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews',
    // url: 'http://localhost:5000/ratings',
    url: 'http://localhost:8080/ratings/reviews',
    // headers: { Authorization: gitToken.Token },
    data: params
  };
  return axios(options)
    .catch((err) => {
      console.log('This is the post review error: ', err);
    });
};
module.exports = {
  getTotalReviews,
  updateHelpfulness,
  updateReported,
  ratingOverview,
  postReview
};