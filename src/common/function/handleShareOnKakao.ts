const handleShareOnKakao = () => {
  const { Kakao } = window;
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '혹시, 이 고양이를 보신 적 있나요?',
      description: '잃어버린 건 아니고요...',
      imageUrl:
        'https://raw.githubusercontent.com/Anne-Hyeyeon/mystorage/main/this-cat/square_latte.png',
      link: {
        mobileWebUrl: 'https://this-cat-project.vercel.app/',
        webUrl: 'https://this-cat-project.vercel.app/',
      },
    },

    buttons: [
      {
        title: '나만의 고양이 포스터 만들러 가기',
        link: {
          mobileWebUrl: 'https://this-cat-project.vercel.app/',
          webUrl: 'https://this-cat-project.vercel.app/',
        },
      },
    ],
  });
};
export default handleShareOnKakao;
