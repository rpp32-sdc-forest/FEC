import React from 'react';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionsList from './QuestionsList.jsx';
import MoreAnsweredQuestions from './MoreAnsweredQuestions.jsx';
import AddQuestion from './AddQuestion.jsx';
import sampleData from '../../../../example/questions.js';
import axios from 'axios';
import FormData from 'form-data';
import config from '../../../../config.js';
import ClickedData from '../ClickDataAnalytics.jsx';

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      questions: [],
      isMoreQuestionsButtonShown: false,
      productName: 'This is not a name',
      isAddNewQuestionClicked: false
    };

    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.search = this.search.bind(this);
    this.updateQuestionList = this.updateQuestionList.bind(this);
    this.clickOnHelpfulQuestion = this.clickOnHelpfulQuestion.bind(this);
    this.clickOnHelpfulAnswer = this.clickOnHelpfulAnswer.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.reportQuestion = this.reportQuestion.bind(this);
    this.addNewAnswer = this.addNewAnswer.bind(this);
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.checkAddingNewQuestion = this.checkAddingNewQuestion.bind(this);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentProduct.id !== this.props.currentProduct.id) {
      let productId = this.props.currentProduct.id;
      //GET QUESTIONS LIST BY PRODUCT ID
      var url = `/qna/getQuestionsList/${productId}`;
      axios.get(url)
        .then((response) => {
          console.log('got question list main 59');

          var questionsToShow = response.data.results;
          if (questionsToShow.length > 2) {
            if (this._isMounted) {
              this.setState({
                isMoreQuestionsButtonShown: true
              });
            }
          }
          questionsToShow = questionsToShow.slice(0, 2);
          if (this._isMounted) {
            this.setState({
              questions: questionsToShow
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  componentDidMount() {
    this._isMounted = true;
    let productId = this.props.productId;
    if (this._isMounted) {
      this.setState({
        productName: this.props.currentProduct.name
      });
    }
    //GET QUESTIONS LIST BY PRODUCT ID
    //, {params: {id: productId}}
    var url = `/qna/getQuestionsList/${productId}`;
    axios.get(url)
      .then((response) => {
        console.log('questions:', response.data);
        var questionsToShow = response.data.results;
        if (questionsToShow.length > 2) {
          if (this._isMounted) {
            this.setState({
              isMoreQuestionsButtonShown: true
            });
          }
        }
        questionsToShow = questionsToShow.slice(0, 2);
        if (this._isMounted) {
          this.setState({
            questions: questionsToShow
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //console.log(this.props);
    console.log('main 81', this.props.currentProduct.id);
  }

  clickOnHelpfulQuestion(productId, questionId) {
    productId = this.props.currentProduct.id;
    console.log('clicked on helpful question');
    // var url = '/qna/updateQuestionHelp';
    var url = `/qna/questions/${questionId}/${productId}/helpful`;
    axios.put(url)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            isHelpful: true
          });
        }
        // this.updateQuestionList(response.data.results);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addNewQuestion(productId, body, nickname, email) {
    productId = this.props.currentProduct.id;
    console.log('clicked on submit new question');
    //SEND REQUEST TO SERVER TO ADD A NEW QUESTION
    // var url = `/qna/questions/${productId}/${body}/${nickname}/${email}`;
    var url = '/qna/questions';
    axios.post(url, {body: {id: productId, body: body, name: nickname, email: email}})
      .then((response) => {
        console.log('received question list after adding question');
        console.log(response.data.results);
        // this.updateQuestionList (response.data.results);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  showMoreQuestions() {
    let productId = this.props.currentProduct.id;
    console.log('click');
    //GET ALL QUESTIONS BY PRODUCT ID
    var url = `/qna/getQuestionsList/${productId}`;
    axios.get(url)
      .then((response) => {
        if (this._isMounted) {
          this.setState({
            questions: response.data.results,
            isMoreQuestionsButtonShown: false
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clickOnHelpfulAnswer(answerId, productId) {
    productId = this.props.currentProduct.id;
    var url = `/qna/answers/${answerId}/${productId}/helpful`;
    axios.put(url)
      .then((response) => {
        // this.updateQuestionList(response.data.results);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  reportAnswer(answerId, productId) {
    console.log('clicked on report answer');
    productId = this.props.currentProduct.id;
    //SEND REQUEST TO REPORT ANSWER
    var url = `/qna/answers/${answerId}/${productId}/report`;
    if (answerId) {
      axios.put(url)
        .then((response) => {
          console.log('sent response to client', response);
          // this.updateQuestionList(response.data.results);
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  reportQuestion(questionId) {
    console.log('clicked on report question');
    //SEND REQUEST TO REPORT ANSWER
    let productId = this.props.currentProduct.id;
    var url = `/qna/questions/${questionId}/${productId}/report`;
    axios.put(url)
      .then((response) => {
        console.log('sent response to client', response);
        // this.updateQuestionList(response.data.results);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  addNewAnswer(questionId, body, nickname, email, photos, productId) {
    productId = this.props.currentProduct.id;

    //console.log('144 main', photos);
    var photosToSend = [];
    var allPromises = [];
    if (photos.length > 0) {
      for (var i = 0; i < photos.length; i++) {
        var promise = new Promise((resolve, reject)=>{
          let file = photos[i];
          var formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'a3yw936t');
          axios.post('https://api.cloudinary.com/v1_1/dqidinkkf/upload', formData)
            .then((response) => {
              console.log('uploaded photo', response.data.secure_url);
              photosToSend.push(response.data.secure_url);
              resolve();
            }). catch(err => {
              console.log(err);
              reject();
            });
        });
        console.log('promises array', allPromises);
        allPromises.push(promise);
      }
      Promise.all(allPromises)
        .then(result => {
          console.log('promises resolved');
          //SEND REQUEST TO SERVER TO ADD A NEW ANSWER
          // var url = '/qna/addNewAnswer';
          //, {params: {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: photosToSend}}
          // ${body}/${nickname}/${email}/${photosToSend}
          var url = '/qna/answers';
          axios.post(url, {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: photosToSend})
            .then((response) => {
              console.log('added new answer', response.data.results);
              //render new answer in the parent component
              this.componentDidMount();
            })
            .catch(function (error) {
              console.log(error);
            });
        });
    } else {
      //send answer without photos
      //SEND REQUEST TO SERVER TO ADD A NEW ANSWER
      console.log('front end post answers');
      let temp = [];
      var url = '/qna/answers';
      //, {params: {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: []}}
      axios.post(url, {id: questionId, productId: productId, body: body, name: nickname, email: email, photos: []})
        .then((response) => {
          console.log('added new answer', response.data.results);
          //render new answer in the parent component
          // this.updateQuestionList(response.data.results);
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        });
    }



  }

  updateQuestionList(questions) {
    console.log('main 256 - state is updating');
    if (this._isMounted) {
      this.setState({
        questions: questions
      });
    }

  }

  search(query, isSearchTriggered) {
    let productId = this.props.productId;
    //console.log('query=', query);
    //console.log('isSearchTriggered=', isSearchTriggered);
    if (isSearchTriggered === true) {
    //GET LIST OF ALL QUESTIONS BY PRODUCT ID
      var url = `/qna/getQuestionsList/${productId}`;
      axios.get(url)
        .then((response) => {
          query = query.toLowerCase();
          console.log('received query', query);
          let questions = response.data.results;
          const filtered = questions.filter(item => item.question_body.toLowerCase().includes(query));
          console.log('filtered', filtered);
          //do not hiding questions if more than 2
          if (this._isMounted) {
            this.setState({
              questions: filtered
            });
          }
        }).catch(error => {
          console.log(error);
        });
    } else {
      console.log('search stopped');
      //render all the questions and hide the rest if more than 2
      //var questionsToShow = response.data.results;
      var questionsToShow = [...this.state.questions];
      if (questionsToShow.length > 2) {
        if (this._isMounted) {
          this.setState({
            isMoreQuestionsButtonShown: true
          });
        }
      }
      questionsToShow = questionsToShow.slice(0, 2);
      if (this._isMounted) {
        this.setState({
          questions: questionsToShow
        });
      }
    }
  }



  checkAddingNewQuestion() {
    console.log('click on add question');
    this.setState({
      isAddNewQuestionClicked: !this.state.isAddNewQuestionClicked
    });
  }

  render() {
    let moreAnsweredQuestions,
      qnaScreen;

    // if (this.state.isAddNewQuestionClicked) {
    //   qnaScreen = 'qna-screen-not-transparent';
    // } else {
    //   qnaScreen = 'qna-screen-transparent';
    // }

    if (this.state.isMoreQuestionsButtonShown) {
      moreAnsweredQuestions = <MoreAnsweredQuestions click={this.showMoreQuestions}/>;
    } else {
      moreAnsweredQuestions = <div></div>;
    }
    return (
      <div className='qna-main-component' onClick={this.props.onClick}>
        <div className={qnaScreen}></div>

        <div className='qna-component-name'>QUESTIONS AND ANSWERS</div>
        <SearchQuestions search={this.search}/>
        <QuestionsList
          data={this.state.questions}
          productId={this.props.productId}
          clickOnHelpful={this.clickOnHelpfulQuestion}
          clickOnHelpfulAnswer={this.clickOnHelpfulAnswer}
          reportAnswer={this.reportAnswer}
          reportQuestion={this.reportQuestion}
          addNewAnswer={this.addNewAnswer}
          productName={this.state.productName}
        />
        <br />
        <div className='qna-button-wrapper'>
          {moreAnsweredQuestions}
          <AddQuestion name={this.state.productName}
            productId={this.props.productId}
            addQuestion={this.addNewQuestion}
            checkForm={this.checkAddingNewQuestion}
          />
        </div>
      </div>

    );
  }
}

const QnAWithClickData = ClickedData(QnA, 'Questions and Answers');

export default QnAWithClickData;
