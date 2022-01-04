import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import fetchReviews from '../shared/fetchReviews.js';
import {CloseButton, MODAL_STYLES, OVERLAY_STYLES} from './AddReview.styles.js';

const AddReview = ({ productId, showModal, openModal, reviewsSort, setReviews }) => {
  //******************************
  // STATE
  //******************************
  const [review, setReview] = useState({
    summary: '',
    body: '',
    name: '',
    email: '',
    photos: [],
    characteristics: {}
  });

  useEffect(() => {
    setReview((oldState) => ({
      ...oldState,
      product_id: productId,
      summary: '',
      body: '',
      name: '',
      email: ''
    }));
  }, [productId]);
  //******************************
  // HANDLERS
  //******************************
  const handleChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    if (field === 'rating') { value = parseInt(value); }
    else if (field === 'recommend') { value = value === 'true'; }
    setReview((oldState) => ({ ...oldState, [field]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/reviews', review)
      .then((res) => {
        alert('Your review has been submitted');
        openModal();
        fetchReviews(productId, reviewsSort)
          .then((res) => { setReviews(res.data); });
      })
      .catch((err) => {
        console.log(err)
        alert('Your review is incomplete. Please complete all required form fields.');
      });
  }
  //******************************
  // RENDER
  //******************************
  if (!showModal) { return null; }
  return (
    <div>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <h1>Write Your Review
          <CloseButton onClick={openModal}>
            Close ❌
          </CloseButton>
        </h1>
        <form onSubmit={handleSubmit}>
          <p>Overall Rating*</p>
          <select name="rating" onChange={handleChange}>
            <option>Select a Rating</option>
            <option value="5">5 Stars - Great</option>
            <option value="4">4 Stars - Good</option>
            <option value="3">3 Stars - Average</option>
            <option value="2">2 Stars - Fair</option>
            <option value="1">1 Star - Poor</option>
          </select>
          <p>Do you recommend this product?*</p>
          <input type="radio" name="recommend" value="true" onChange={handleChange} />
          <label htmlFor="yes">Yes</label>
          <input type="radio" name="recommend" value="false" onChange={handleChange} />
          <label htmlFor="no">No</label>
          <p>Review Summary ({60 - review.summary.length} characters remaining):</p>
          <p><input type="text" name="summary" size="58" maxLength="60" placeholder="Example: Best purchase ever!" value={review.summary} onChange={handleChange} /></p>
          <p>Review Body ({1000 - review.body.length} characters remaining)*</p>
          <p><textarea name="body" rows="4" cols="50" required minLength="50" maxLength="1000" placeholder="Why did you like the product or not?" value={review.body} onChange={handleChange} /></p>
          <p>Photos: <input type="file" /></p>
          <p>What is your nickname?*</p>
          <p><input type="text" name="name" required placeholder="What is your nickname" value={review.name} onChange={handleChange} /></p>
          <p>Your email*</p>
          <p><input type="email" name="email" required placeholder="Example: jackson11@email.com" value={review.email} onChange={handleChange} /></p>
          <p>For authentication reasons, you will not be emailed</p>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
