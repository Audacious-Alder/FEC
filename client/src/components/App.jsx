import React, { useState, useEffect } from 'react';
import Overview from './overview/Overview.jsx';
import Related from './related/Related.jsx';
import Reviews from './reviews/Reviews.jsx';
import Questions from './questions/Questions.jsx';
import fetchReviews from './shared/fetchReviews.js';
import axios from 'axios';

export const App = () => {
  //******************************
  // STATE
  //******************************
  const [productId, setProductId] = useState(63609);
  const [product, setProduct] = useState({});
  const [productStyle, setProductStyle] = useState({})
  const [reviewMetaData, setReviewMetaData] = useState({});
  const [reviews, setReviews] = useState({});
  const [reviewsSort, setReviewsSort] = useState('helpful');
  const [isLoading, setIsLoading] = useState(true);
  //******************************
  // Data fetching
  //******************************
  const fetchData = (id = 63609) => {
    const getProducts = axios.get('/products', {params: {product_id: id}})
      .then((res) => { setProduct(res.data); })
    const getStyles = axios.get('/products/styles', { params: { product_id: id}})
      .then((res) => { setProductStyle(res.data); } )
    const getReviewsMeta = axios.get('/reviews/meta', {params: { product_id: id }})
      .then((res) => { setReviewMetaData(res.data); })
    const getReviews = fetchReviews(id, reviewsSort)
      .then((res) => { setReviews(res.data); })

    const promises = [getProducts, getStyles, getReviewsMeta, getReviews];
    Promise.all(promises)
      .then(() => { setIsLoading(false); })
      .then(() => { setProductId(id); })
      .catch((err) => { console.log(err) });
  }

  useEffect(() => {
    const url = new URL (document.URL)
    const id = parseInt(url.search.split('=')[1]);
    if (id) {
      fetchData(id);
    } else {
      fetchData(productId);
    }
    console.log('fetching data for product_id: ', productId);
  }, [productId])

  useEffect(() => {
    fetchReviews(productId, reviewsSort)
      .then((res) => { setReviews(res.data); })
  }, [reviewsSort])
  //******************************
  // Render
  //******************************
  if (isLoading) { return 'Loading' }
  return (
    <div>
      <h1 className="title">Audacious Alder</h1>
      <a name="top"></a>
      <Overview
        product={product}
        productStyle={productStyle}
        reviewMetaData={reviewMetaData}
      />
      <Related
        productId={productId}
        setProductId={setProductId}
        currentProduct={product}
      />
      <Reviews
        productId={productId}
        reviewMetaData={reviewMetaData}
        reviews={reviews}
        setReviews={setReviews}
        reviewsSort={reviewsSort}
        setReviewsSort={setReviewsSort}
      />
      <Questions />
    </div>
  )
}

export default App;
