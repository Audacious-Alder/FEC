import React, { useState, useRef } from 'react';
import StyleEntry from './StyleEntry.jsx';

// style thumbnail bar that shows thumbnail url pics and on click will render product img url to overview

const Style = function ({ productStyle, getStyleInfo }) {
  return (
    <div className="box">
      <div>
        <ul className="styleList">
          {productStyle.results.map((style, idx) => (
            <StyleEntry
              key={idx}
              style={style}
              getStyleInfo={getStyleInfo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Style;
