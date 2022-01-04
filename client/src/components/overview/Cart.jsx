import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = function ({ skus }) {
  const [size, setSize] = useState(null);
  const [quant, setQuant] = useState(1);
  const [skuId, setSkuId] = useState(null);

  const skusArray = [];
  const hash = {};
  const selectSize = 'Select Size';

  useEffect(() => {
    setSize(null)
  }, [skus])


  for (const key in skus) {
    if (key == 2275494) {
      skusArray.push({ key: {quantity: skus[key].quantity, size: 'XXL', sku_id: key}})
    } else {
      skusArray.push({ key: {...skus[key], sku_id: key} });
    }
  }

  for (let i = 0; i < skusArray.length; i++) {
    if (!hash[skusArray[i].key.size]) {
      hash[skusArray[i].key.size] = skusArray[i].key.quantity;
    }
  }

  const renderQuantity = () => {
    const quantArray = [];
    const sizeQuant = hash[size] > 15 ? 15 : hash[size]
    if (!size) {
      return (
        <option
          disabled>
          -
        </option>
      );
    } else if (!hash) {
      return (
        <option>
          OUT OF STOCK
        </option>
      )
    }
    for (let i = 1; i <= sizeQuant; i++) {
      quantArray.push(
        <option
          key={i}>
          {i}
        </option>,
      );
    }
    return quantArray;
  };

  //need to fix efficiency, can't set sku_id properly in time
  const getSkuId = () => {
    for (let i = 0; i < skusArray.length; i++) {
      if (skusArray[i].key.size === size) {
        return skusArray[i].key.sku_id
      }
    }
  }

  const addToCart = () => {
    let params = {
      sku_id: skuId,
      count: quant
    }
    axios.post('/cart', params)
      .then((res) => {console.log('Add to cart (:')})
      .catch((err) => {console.log('Failed to add to card ):')})
  }


  return (
    <div className="cartContainer">
      <select className="quantDrop">
        {renderQuantity()}
      </select>
      <select className="sizeDrop"
        value={size ? size : selectSize}
        onChange={(e) => {
          setSize(e.target.value);
          setSkuId(getSkuId(size));
        }}>
        <option
          key={selectSize}
          value={selectSize}>
          {selectSize}
        </option>
        {skusArray.map((sku, idx) => (
          <option
            key={sku.sku_id}>
            {sku.key.size}
          </option>
        ))}
      </select>
      <button className="cartButton">
        Add to Cart
      </button>
    </div>
  );
};

export default Cart;
