const createStarRating = (rating) => {
  const fullStars = Math.floor(rating / 2);
  const halfStars = Math.floor(rating) % 2;
  const emptyStars = 5 - fullStars - halfStars;
  return (
    <>
      {"★".repeat(fullStars)}
      {"☆".repeat(halfStars)}
      {"☆".repeat(emptyStars)}
    </>
  );
};

export { createStarRating };
