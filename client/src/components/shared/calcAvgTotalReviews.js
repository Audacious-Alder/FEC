const calcAvgTotalReviews = (reviewsMetaData) => {
  let stars = 0;
  let reviews = 0;

  for (let key in reviewsMetaData.ratings) {
    stars += Number(reviewsMetaData.ratings[key]) * Number(key)
    reviews += Number(reviewsMetaData.ratings[key])
  }

  return {
    avgStars: reviews ? (stars/reviews).toFixed(1) : 0,
    reviews: reviews
  }
}

export default calcAvgTotalReviews;