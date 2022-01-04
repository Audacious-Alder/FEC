import React, { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Style from './Style.jsx';
import Cart from './Cart.jsx';
import axios from 'axios';

const Overview = function ({ product, productStyle, reviewMetaData }) {

  const [styleInfo, setStyleInfo] = useState(productStyle.results[0])

  const getStyleInfo = (styleId) => {
    for (let i = 0; i < productStyle.results.length; i++) {
      if (productStyle.results[i].style_id === styleId) {
        setStyleInfo(productStyle.results[i])
      }
    }
  }

  useEffect(() => {
    setStyleInfo(productStyle.results[0])
  }, [productStyle])

  return (
    <div className="overview">
      <div className="overLeft">
        <ImageGallery
          productPhoto={styleInfo}
        />
      </div>
      <div className="overviewRight">
        <ProductInfo
          product={product}
          styleInfo={styleInfo}
          reviewMetaData={reviewMetaData}
        />
        <Style
          getStyleInfo={getStyleInfo}
          productStyle={productStyle}
        />
        <Cart
          skus={styleInfo.skus}
        />
      </div>
    </div>
  );
};

export default Overview;
