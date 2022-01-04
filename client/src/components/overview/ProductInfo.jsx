import React, { useState } from 'react';
import calcStarImg from '../shared/calcStarImg.jsx';
import calcAvgTotalReviews from '../shared/calcAvgTotalReviews.js';

const ProductInfo = function ({ product, styleInfo, reviewMetaData }) {

  const itemPrice = () => {
    if (styleInfo.original_price == product.default_price) {
      return (
        product.default_price
      )
    } else {
      return (
        styleInfo.original_price
      )
    }
  }

  const salePrice = () => {
    if (styleInfo.sale_price) {
      return (
        <div>
          <div className="originalPrice">
            ${itemPrice()}
          </div>
          <div className="salesPrice">
            ${styleInfo.sale_price}
          </div>
        </div>
      )
    } else {
      return (
        <div>${itemPrice()}</div>
      )
    }
  }
  return (
    <div id="productContainer">
      <span id="productName">
        {product.name}
      </span>
      <span id="productPrice">
        {salePrice()}
      </span>
      <span id="productStar">
        {calcStarImg(calcAvgTotalReviews(reviewMetaData).avgStars)}
      </span>
      <p id="productDescription">
        {product.description}
      </p>
      <span id="productCategory">
        {product.category}
      </span>
      <span id="productSocial">
        Social Media
      </span>
    </div>
  );
};

export default ProductInfo;
