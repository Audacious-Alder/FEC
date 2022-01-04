import React, { useState, useEffect } from 'react';
import ImageGalleryThumbnail from './ImageGalleryThumbnail.jsx'

const ImageGallery = function ({ productPhoto }) {

  const [image, setImage] = useState(productPhoto.photos[0].url)

  const setImageGallery = (newImage) => {
    setImage(newImage)
  }

  useEffect(() => {
    setImage(productPhoto.photos[0].url)
  }, [productPhoto])

  return (
    <div className="imageGalleryContainer">
      <ul className="imageGalleryList">
        {productPhoto.photos.map((photo, idx) => {
          return (
            <ImageGalleryThumbnail
              key={idx}
              photo={photo}
              setImageGallery={setImageGallery}
            />
          )
        })}
      </ul>
      <img
        className="imageGallery"
        src={image}
      />
    </div>
  );
};

export default ImageGallery;
