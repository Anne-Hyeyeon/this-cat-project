export const getPosterWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return 50;
  } else {
    // xs
    return 60;
  }
};
