import React from 'react';
import calcAvgTotalReviews from '../shared/calcAvgTotalReviews.js';
import fetchReviews from '../shared/fetchReviews.js';

const SortingBar = ({ reviewMetaData, setReviews, setReviewsSort }) => {
  return (
    <h2>
      {calcAvgTotalReviews(reviewMetaData).reviews} reviews, sorted by &nbsp;
      <select onChange={ (e) => setReviewsSort(e.target.value)}>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
        <option value="relevant">relevance</option>
      </select> ↓
    </h2>
  );
}

export default SortingBar;
