export const getPosterWidth = (xsWidth: number, smWidth: number): number => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return smWidth;
  } else {
    // xs
    return xsWidth;
  }
};
