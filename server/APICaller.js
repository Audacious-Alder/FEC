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
    const { review_id } = req.body;
    axios.put(`${server}/reviews/${review_id}/helpful`, null, { headers: options })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
  reviewsReportPUT: (req, res) => {
    const { review_id } = req.body;
    axios.put(`${server}/reviews/${review_id}/report`, null, { headers: options })
      .then((api) => { res.send(api.data); })
      .catch((err) => { console.log(err); });
  },
};

const questions = {
  questionsGET: (req, res) => {
    axios.get(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions',
      { headers: options, params: { product_id: req.query.id } },
    )
      .then((response) => { res.send(response.data); })
      .catch((error) => { console.log(error); });
  },
  answersGET: (req, res) => {
    axios.get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${req.query.id}/answers`,
      { headers: options },
    )
      .then((response) => { res.send(response.data); })
      .catch((error) => { console.log(error); });
  },
  questionPOST: (req, res) => {
    axios.post(
      'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions',
      {
        body: req.body.body, name: req.body.name, email: req.body.email, product_id: req.body.id,
      },
      { headers: options },
    )
      .then((response) => { res.send(response.data); })
      .catch((error) => { console.log(error); });
  },
  answersPOST: (req, res) => {
    axios.post(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/qa/questions/${req.query.id}/answers`,
      {
        body: req.body.body, name: req.body.name, email: req.body.email, photos: req.body.photos,
      },
      { headers: options },
    )
      .then((response) => { res.send(response.data); })
      .catch((error) => { console.log(error); });
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
  cartGET: (req, res) => {
    axios.get(`${server}/cart`, { headers: options })
      .then((api) => {
        res.status(200).send(api.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  cartPOST: (req, res) => {
    axios.post(`${server}/cart`, req.body, { headers: options })
      .then((api) => {
        res.status(201).send(api.data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
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
