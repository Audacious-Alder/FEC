import React from 'react';

// style thumbnail bar that shows thumbnail url pics and on click will render product img url to overview

const StyleEntry = function ({ style, getStyleInfo }) {
  return (
    <div className="thumbnailStyle">
      <li className="styleName">{style.name}</li>
      <img
        onClick={(e) => {getStyleInfo(style.style_id)}}
        className="thumbnail"
        src={style.photos[0].thumbnail_url}
      />
    </div>
  );
};

export default StyleEntry;
