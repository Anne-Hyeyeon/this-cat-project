export const objectCaseSelector = (noun: string) => {
  const lastCharCode = noun.charCodeAt(noun.length - 1) - 44032;
  const lastCharIndex = lastCharCode % 28;
  if (lastCharIndex !== 0) return '을';
  else return '를';
};

export const subjectCaseSelector = (noun: string) => {
  const lastCharCode = noun.charCodeAt(noun.length - 1) - 44032;
  const lastCharIndex = lastCharCode % 28;
  if (lastCharIndex !== 0) return '이';
  else return '가';
};

export const endingWithConsonantSelector = (noun: string) => {
  const lastCharCode = noun.charCodeAt(noun.length - 1) - 44032;
  const lastCharIndex = lastCharCode % 28;
  if (lastCharIndex !== 0) return '이';
  else return '';
};
