/* eslint-disable camelcase */
const axios = require('axios');
const config = require('../config');

const options = { Authorization: config.token };
const server = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo';
// sample product_id: 63617

// Data fetching function
const fetchURL = (url) => axios.get(url, { headers: options });

const products = {
  productsGET: () => {
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products', { headers: options })
      .then((testData) => { console.log(testData.data); })
      .catch((error) => { console.log(error, 'ERROR'); });
  },
  productGET: (req, res) => {
    axios.get(`${server}/products/${req.query.product_id}`, { headers: options })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  productStylesGET: (req, res) => {
    axios.get(`${server}/products/${req.query.product_id}/styles`, { headers: options })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  productRelatedGET: (req, res) => {
    axios.get(`${server}/products/${req.query.product_id}/related`, { headers: options })
      .then((data) => {
        res.status(200).send(data.data);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  // Method for getting data for multiple products, need to take in an array of ID from the request.
  multiProductGET: (req, res) => {
    const urlArray = [];
    for (let i = 0; i < req.query.product_id.length; i += 1) {
      urlArray.push(`${server}/products/${req.query.product_id[i]}`);
    }
    const promiseArray = urlArray.map(fetchURL);
    Promise.all(promiseArray)
      .then((response) => {
        const productsData = [];
        for (let j = 0; j < response.length; j += 1) {
          productsData.push(response[j].data);
        }
        res.status(200).send(productsData);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  mulitStylesGET: (req, res) => {
    const urlArray = [];
    for (let i = 0; i < req.query.product_id.length; i += 1) {
      urlArray.push(`${server}/products/${req.query.product_id[i]}/styles`);
    }
    const promiseArray = urlArray.map(fetchURL);
    Promise.all(promiseArray)
      .then((response) => {
        const stylesData = [];
        for (let j = 0; j < response.length; j += 1) {
          stylesData.push(response[j].data);
        }
        res.status(200).send(stylesData);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  multiReviewsMetaGET: (req, res) => {
    const urlArray = [];
    for (let i = 0; i < req.query.product_id.length; i += 1) {
      urlArray.push(`${server}/reviews/meta/?product_id=${req.query.product_id[i]}`);
    }
    const promiseArray = urlArray.map(fetchURL);
    Promise.all(promiseArray)
      .then((response) => {
        const reviewMetaData = [];
        for (let j = 0; j < response.length; j += 1) {
          reviewMetaData.push(response[j].data);
        }
        res.status(200).send(reviewMetaData);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  },
};

// `${server}/reviews/meta/?product_id=${req.query.product_id[i]}`

const reviews = {
  reviewsGET: (req, res) => {
    axios.get(`${server}/reviews`, { headers: options, params: req.query })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
  reviewsMetaGET: (req, res) => {
    axios.get(`${server}/reviews/meta`, { headers: options, params: req.query })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
  reviewsPOST: (req, res) => {
    axios.post(`${server}/reviews`, req.body, { headers: options })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
  reviewsHelpfulPUT: (req, res) => {
    let { review_id } = req.query
    axios.put(`${server}/reviews/${review_id}/helpful`, { headers: options })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
  reviewsReportPUT: (req, res) => {
    let { review_id } = req.query
    axios.put(`${server}/reviews/${review_id}/report`, { headers: options })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
};

const questions = {
  questionsGET: () => {
    axios.get('/qa/questions', { headers: options })
      .then()
      .catch();
  },
  answersGET: (question_id) => {
    axios.get(`/qa/questions/${question_id}/answers`, { headers: options })
      .then()
      .catch();
  },
  questionPOST: (question) => {
    axios.post('/qa/questions', { headers: options })
      .then()
      .catch();
  },
  answersPOST: (question_id, answer) => {
    axios.post(`/qa/questions/${question_id}/answers`, { headers: options })
      .then()
      .catch();
  },
  questionsHelpfulPUT: (question_id) => {
    axios.put(`/qa/questions/${question_id}/helpful`, { headers: options })
      .then()
      .catch();
  },
  questionsReportPUT: (question_id) => {
    axios.put(`/qa/questions/${question_id}/report`, { headers: options })
      .then()
      .catch();
  },
  answersHelpfulPUT: (answer_id) => {
    axios.put(`/qa/answers/${answer_id}/helpful`, { headers: options })
      .then()
      .catch();
  },
  answersReportPUT: (answer_id) => {
    axios.put(`/qa/answers/${answer_id}/report`, { headers: options })
      .then()
      .catch();
  },
};

const cart = {
  cartGET: () => {
    axios.get('/cart', { headers: options })
      .then()
      .catch();
  },
  cartPOST: (item) => {
    axios.post('/cart', { headers: options })
      .then()
      .catch();
  },
};

const interaction = {
  logInteractionPOST: (interaction) => {
    axios.post('/interactions', { headers: options })
      .then()
      .catch();
  },
};

module.exports = {
  products,
  reviews,
  questions,
  cart,
  interaction,
};
