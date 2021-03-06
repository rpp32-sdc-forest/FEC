const api = require('../qnaApi.js');

var receiveProductInfoById = function receiveProductInfoById(id) {
  return new Promise((resolve, reject) => {
    api.getProductFromHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var receiveQuestionList = function receiveQuestionList(id) {
  return new Promise((resolve, reject)=> {
    api.getQuestionsFromHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
var receiveAnswerList = function receiveQuestionList(id) {
  return new Promise((resolve, reject)=> {
    api.getAnswersFromHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var increaseQuestionHelp = function increaseQuestionHelp(id) {
  return new Promise((resolve, reject) => {
    api.addQuestionHelpHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

var increaseAnswerHelp = function increaseAnswerHelp(id) {
  return new Promise((resolve, reject) => {
    api.addAnswerHelpHR(id, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
// productId, body, name, email
var addQuestionToServer = function addQuestionToServer(body) {
  return new Promise((resolve, reject) => {
    api.addNewQuestionToHR(body, (err, result) => {
      if (err) {
        reject(err);
      } else {
        console.log('add Q controller');
        resolve(result);
      }
    });
  });
};

var addAnswerToServer = function addAnswerToServer(questionId, body, name, email, photos) {
  console.log('server is adding new answer2:', questionId, body, name, email, photos);
  return new Promise((resolve, reject) => {
    api.addNewAnswerToHR(questionId, body, name, email, photos, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve (result);
      }
    });
  });
};

var reportAnswerToServer = function reportAnswerToServer(answerId) {
  return new Promise((resolve, reject) => {
    api.reportAnswerToHR(answerId, (err, result) => {
      if (err) {
        reject (err);
      } else {
        resolve(result);
      }
    });
  });
};

var reportQuestionToServer = function reportQuestionToServer(questionId) {
  return new Promise((resolve, reject) => {
    api.reportQuestionToHR(questionId, (err, result) => {
      if (err) {
        reject (err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  receiveProductInfoById,
  receiveQuestionList,
  receiveAnswerList,
  increaseQuestionHelp,
  increaseAnswerHelp,
  addQuestionToServer,
  addAnswerToServer,
  reportAnswerToServer,
  reportQuestionToServer
};
