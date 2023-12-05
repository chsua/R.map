export const notionBanana = {
  id: 0,
  name: '바나나',
  description: '노랗고 달달한 더운 지역에서 재배되는 과일',
  relatedNotionList: [
    {
      id: 1,
      name: '원숭이',
    },
    {
      id: 2,
      name: '바나나우유',
    },
    {
      id: 5,
      name: '사과',
    },
  ],
};

export const notionApple = {
  id: 5,
  name: '사과',
  description: '빨갛고 동그란, 나무에 열리는 과실',
  relatedNotionList: [
    {
      id: 3,
      name: '백설공주',
    },
    {
      id: 4,
      name: '바나나',
    },
  ],
};

export const notionBear = {
  id: 9,
  name: '곰',
  description: '겨울잠을 자는 크고 힘이 쎈 동물',
  relatedNotionList: [
    {
      id: 8,
      name: '연어',
    },
  ],
};

export const notionList = [notionBear, notionApple, notionBanana];
