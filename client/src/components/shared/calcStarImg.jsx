import React from 'react';

const calcStarImg = (numStars = 0) => {
  let starImg = [];
  let wholeStars = Math.floor(numStars);
  let fractionStar = numStars - Math.floor(numStars);
  let emptyStars = 5 - Math.ceil(numStars);
  if (fractionStar > 0 && fractionStar < 0.25) { emptyStars++; }

  // whole stars
  for(let i = 1; i <= wholeStars; i++) {
    starImg.push('./images/small/fullstar.png');
  }

  // fractional stars
  if (fractionStar >= 0.75) {
    starImg.push('./images/small/threequarterstar.png');
  } else if (fractionStar >= 0.5) {
    starImg.push('./images/small/halfstar.png');
  } else if (fractionStar >= 0.25) {
    starImg.push('./images/small/quarterstar.png');
  }

  // empty stars
  for(let i = 1; i <= emptyStars; i++) {
    starImg.push('./images/small/emptystar.png');
  }

  return (
    <span>
      {starImg.map((img, index) => (
        <img src={img} key={index}></img>
      ))}
    </span>
  )
}

export default calcStarImg;