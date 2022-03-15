const qnaRouter = require('express').Router();
const axios = require('axios');
const api = require('../qnaApi.js');
const qnaController = require('./qna_controller.js');
// /home/ubuntu/QNA-API
// qnaRouter.get('/getProductById', (req, res) => {
//   let id = req.query.id;

//   qnaController.receiveProductInfoById(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// });

qnaRouter.get('/getQuestionsList/:id', (req, res) =>{
  let id = req.params.id;
  //console.log('QNA API:', id);
  qnaController.receiveQuestionList(id).
    then(data => {
      res.send(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });

});

qnaRouter.get('/getAnswersList', (req, res) =>{
  let id = req.query.id;

  qnaController.receiveAnswerList(id).
    then(data => {
      res.send(data);
    })
    .catch(err => {
      res.sendStatus(400);
    });

});

qnaRouter.put('/questions/:questionId/:productId/helpful', (req, res) => {
  let questionId = req.params.questionId;
  let productId = req.params.productId;
  console.log('server question helpful:', questionId, productId);
  qnaController.increaseQuestionHelp(questionId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          //console.log('questions', result);
          res.send(result);
        });
    })
    .catch(err => {
    });
});

qnaRouter.put('/answers/:answerId/:productId/helpful', (req, res) => {
  let answerId = req.params.answerId;
  let productId = req.params.productId;

  qnaController.increaseAnswerHelp(answerId)
    .then(data => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });

});

qnaRouter.post('/questions', async (req, res) => {
  //console.log('qna router all new Q:', req.body);
  let productId = req.body.body.id;
  // let body = req.body.body;
  // let name = req.body.name;
  // let email = req.body.email;
  const body = req.body;
  await qnaController.addQuestionToServer(body)
    .then ((data) => {
      qnaController.receiveQuestionList(productId)
        .then(result => {
          //console.log('after post2:', result);
          res.sendStatus(201);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});


qnaRouter.post('/answers', async (req, res) => {
  let productId = req.body.productId;
  let questionId = req.body.id;
  let body = req.body.body;
  let name = req.body.name;
  let email = req.body.email;
  let photos = req.body.photos;
  console.log('server is adding new answer:', req.body);
  await qnaController.addAnswerToServer(questionId, body, name, email, photos)
    .then(async data =>{
      await qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});

qnaRouter.put('/answers/:answerId/:productId/report', (req, res) => {
  console.log('report answer:', req.params);
  let productId = req.params.productId;
  let answerId = req.params.answerId;
  qnaController.reportAnswerToServer(answerId)
    .then(data =>{
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});

qnaRouter.put('/questions/:questionId/:productId/report', (req, res) => {
  let questionId = req.params.questionId;
  let productId = req.params.productId;
  console.log('report question:', questionId, productId);
  qnaController.reportQuestionToServer(questionId)
    .then(data =>{
      qnaController.receiveQuestionList(productId)
        .then(result => {
          res.send(result);
        });
    })
    .catch(error => {
      res.sendStatus(400);
    });
});

module.exports = qnaRouter;