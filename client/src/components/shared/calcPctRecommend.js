const calcPctRecommend = (reviewMetaData) => {
  let pct = 0;
  let totalReviews = parseInt(reviewMetaData.recommended.true) + parseInt(reviewMetaData.recommended.false);
  if (totalReviews > 0) { pct = Math.round((reviewMetaData.recommended.true / totalReviews) * 100); }
  return pct;
}

export default calcPctRecommend;