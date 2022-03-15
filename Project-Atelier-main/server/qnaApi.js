const axios = require('axios');
const gitToken = require('../config.js');

// var getProductFromHR = function getProductFromHR(id, callback) {
//   let options = {
//     method: 'GET',
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
//     headers: { Authorization: gitToken.Token },
//   };
//   axios.get(options.url, options)
//     .then(function (response) {
//       callback(null, response.data);
//     })
//     .catch(function (error) {
//       callback(error, null);
//     });

// };

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}
var getQuestionsFromHR = function getQuestionsFromHR(id, callback) {
  console.log('get Question:', id);
  let options = {
    method: 'GET',
    url: `http://52.90.176.126:8080/qna/getQuestionsList/${id}`,
    //url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions?product_id=${id}`,
    //headers: { Authorization: gitToken.Token }
    // params: {id: id},
    //52.90.176.126:8080
  };

  axios.get(options.url, options)
    .then(function (response) {
      console.log('QNA response:');
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};


var addQuestionHelpHR = function addQuestionHelpHR(id, callback) {
  console.log('add question help:', id);
  let options = {
    method: 'PUT',
    url: `http://localhost:8080/qna/questions/${id}/helpful`,
    //url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    //headers: { Authorization: gitToken.Token }
  };
  console.log('question helpful:', id);
  axios.put(options.url)
    .then(function (response) {
      callback(null, true);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addAnswerHelpHR = function addAnswerHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    url: `http://localhost:8080/qna/answers/${id}/helpful`,
    //url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    //headers: { Authorization: gitToken.Token }
  };
  console.log('answer helpful:', id);
  axios.put(options.url)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};
// id, body, name, email
var addNewQuestionToHR = function addNewQuestionToHR(body, callback) {
  body = body.body;
  console.log('post new Q:', body);
  let options = {
    method: 'POST',
    // url: `http://localhost:3001/qa/questions/${id}`,
    url: 'http://localhost:8080/qna/questions',
    //headers: { Authorization: gitToken.Token }
  };
  axios.post(options.url, {body})
    .then(function (response) {
      console.log('got response creating new question', response.data);
      callback(null, true);
    })
    .catch(function (error) {
      console.log('error creating new question');
      callback(error, null);
    });
};

var addNewAnswerToHR = function addNewAnswerToHR(questionId, body, name, email, photos, callback) {

  let options = {
    method: 'POST',
    url: 'http://localhost:8080/qna/answers/',
    //url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`,
    // body: {id: questionId, body: body, name: name, email: email, photos: photos },
    //headers: { Authorization: gitToken.Token }
  };
  console.log('server is adding new answer3:', questionId, body, name, email, photos);
  axios.post(options.url, {id: questionId, body, name, email, photos})
    .then(function (response) {
      callback(null, true);
    })
    .catch(function (error) {
      console.log('error creating new question', error);
      callback(error, null);
    });

};

var reportAnswerToHR = function reportAnswerToServer (answerId, callback) {

  let options = {
    method: 'PUT',
    url: `http://localhost:8080/qna/answers/${answerId}/report`,
    //url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`,
    //headers: { Authorization: gitToken.Token }
  };

  axios.put(options.url)
    .then(function (response) {
      callback(null, true);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var reportQuestionToHR = function reportQuestionToServer (questionId, callback) {

  let options = {
    method: 'PUT',
    url: `http://localhost:8080/qna/questions/${questionId}/report`,
    //headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url)
    .then(function (response) {
      callback(null, true);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

module.exports = {
  // getProductFromHR,
  getQuestionsFromHR,
  addQuestionHelpHR,
  addAnswerHelpHR,
  addNewQuestionToHR,
  addNewAnswerToHR,
  reportAnswerToHR,
  reportQuestionToHR
};