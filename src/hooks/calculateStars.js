const calculateStars = (voteAverage) => {
  const totalStars = 5;
  const roundedHalf = Math.round((voteAverage / 2) * 2) / 2; // Convert to scale of 5, then round to nearest half
  const fullStars = Math.floor(roundedHalf);
  const halfStar = roundedHalf % 1 !== 0 ? 1 : 0;
  const emptyStars = totalStars - fullStars - halfStar;

  return { fullStars, halfStar, emptyStars };
};

export default calculateStars;
