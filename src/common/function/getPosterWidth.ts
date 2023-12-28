export const getPosterWidth = (xsWidth: number, smWidth: number): number => {
  // 스크린 화면의 크기를 체크한 후, 화면에 맞는 포스터 크기를 리턴
  const screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    // sm 이상
    return smWidth;
  } else {
    // xs
    return xsWidth;
  }
};
