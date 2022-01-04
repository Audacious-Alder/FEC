import React, { useState } from 'react';
import styled from 'styled-components'
import SortingBar from './SortingBar.jsx';
import ReviewEntry from './ReviewEntry.jsx';
import AddReview from './AddReview.jsx';
import { ColumnContainer } from './Reviews.jsx';

const ReviewList = ({ productId, reviews, reviewMetaData, setReviews, reviewsSort, setReviewsSort }) => {
  //******************************
  // STATE
  //******************************
  const [numReviews, setNumReviews] = useState(2);
  const [showModal, setShowModal] = useState(false);
  //******************************
  // HANDLERS
  //******************************
  const openModal = () => { setShowModal((prev) => !prev); };
  const handleMoreReviews = () => { setNumReviews((prevNum) => prevNum + 2); };
  //******************************
  // RENDER
  //******************************
  return (
    <ColumnContainer>
      <SortingBar
        setReviews={setReviews}
        reviewMetaData={reviewMetaData}
        productId={productId}
        setReviewsSort={setReviewsSort}
      />
      {reviews.results.slice(0, numReviews).map((review, index) => (
        <ReviewEntry
          review={review}
          key={review.review_id}
          productId={productId}
          reviewsSort={reviewsSort}
          setReviews={setReviews}
        />
      ))}
      <p>
        <button type="submit" onClick={handleMoreReviews}>More Reviews</button>
        &nbsp;
        <button type="submit" onClick={openModal}>Add A Review +</button>
      </p>
      <AddReview
        productId={productId}
        showModal={showModal}
        openModal={openModal}
        reviewsSort={reviewsSort}
        setReviews={setReviews}
      />
    </ColumnContainer>
  );
};

export default ReviewList;
