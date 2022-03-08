const axios = require('axios');
const gitToken = require('../config.js');

var getProductFromHR = function getProductFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: { Authorization: gitToken.Token },
  };
  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });

};

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}
var getQuestionsFromHR = function getQuestionsFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `http://localhost:3001/qna/getQuestionsList/${id}`,
  };

  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var getAnswersFromHR = function getQuestionsFromHR(id, callback) {
  let options = {
    method: 'GET',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${id}/answers`,
    headers: { Authorization: gitToken.Token }
  };
  axios.get(options.url, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var addQuestionHelpHR = function addQuestionHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    // url: `http://localhost:3001/qa/questions/${id}/helpful`,
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    headers: { Authorization: gitToken.Token }
  };
  console.log('question helpful:', id);
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addAnswerHelpHR = function addAnswerHelpHR(id, callback) {
  let options = {
    method: 'PUT',
    // url: `http://localhost:3001/qa/answers/${id}/helpful`,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`,
    headers: { Authorization: gitToken.Token }
  };
  console.log('answer helpful:', id);
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      callback(error, null);
    });
};

var addNewQuestionToHR = function addNewQuestionToHR(id, body, name, email, callback) {
  let options = {
    method: 'POST',
    // url: `http://localhost:3001/qa/questions/${id}`,
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions',
    // eslint-disable-next-line camelcase
    body: { body: body, name: name, email: email, product_id: id },
    headers: { Authorization: gitToken.Token }
  };
  axios.post(options.url, options.body, options)
    .then(function (response) {
      // console.log('got response creating new question', response);
      callback(null, response.data);
    })
    .catch(function (error) {
      //console.log(error);
      console.log('error creating new question');
      callback(error, null);
    });
};

var addNewAnswerToHR = function addNewAnswerToHR(questionId, body, name, email, photos, callback) {

  let options = {
    method: 'POST',
    // url: `http://localhost:3001/qa/answers/${questionId}`,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${questionId}/answers`,
    body: {id: questionId, body: body, name: name, email: email, photos: photos },
    headers: { Authorization: gitToken.Token }
  };
  console.log('server is adding new answer3:', questionId, body, name, email, photos);

  axios.post(options.url, options.body, options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log('error creating new question', error);
      callback(error, null);
    });

};

var reportAnswerToHR = function reportAnswerToServer (answerId, callback) {

  let options = {
    method: 'PUT',
    // url: `http://localhost:3001/qa/answers/${answerId}/report`,
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${answerId}/report`,
    headers: { Authorization: gitToken.Token }
  };

  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

var reportQuestionToHR = function reportQuestionToServer (questionId, callback) {

  let options = {
    method: 'PUT',
    url: `http://localhost:3001/qa/questions/${questionId}/report`,
    headers: { Authorization: gitToken.Token }
  };
  axios.put(options.url, '', options)
    .then(function (response) {
      callback(null, response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback(error, null);
    });
};

module.exports = {
  getProductFromHR,
  getQuestionsFromHR,
  addQuestionHelpHR,
  addAnswerHelpHR,
  addNewQuestionToHR,
  addNewAnswerToHR,
  reportAnswerToHR,
  getAnswersFromHR,
  reportQuestionToHR
};