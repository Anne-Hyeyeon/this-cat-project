export const postpositionSelector = ( noun: string ) => {
const lastCharCode = noun.charCodeAt(noun.length - 1) - 44032;
  const lastCharIndex = lastCharCode % 28;
  if (lastCharIndex === 8 || lastCharIndex === 17 || lastCharIndex === 18 || lastCharIndex === 21) {
    return "을";
  } else if (lastCharIndex === 4 || lastCharIndex === 13) {
    return "를";
  } else {
    return "을";
  }
}