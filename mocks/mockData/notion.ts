import { Notion } from 'types/notion';

export const mockNotionMonkey: Notion = {
  id: 1,
  name: '원숭이',
  notionFolderId: 1,
  content:
    '원숭이 또는 잔나비는 영장류에 속하는 동물의 총칭이다. 원숭이하목은 크게 "신세계원숭이", "구세계원숭이", "유인원"으로 나뉜다. 신세계원숭이는 광비원소목을 이루지만, 구세계원숭이는 협비원소목의 한 상과에 그친다. 생김새와는 다르게, 분류학상으로는 인간과 훨씬 더 근연 관계에 있다.',
  relatedNotions: [
    {
      id: 4,
      name: '바나나',
    },
  ],
};

export const mockNotionBananaMilk: Notion = {
  id: 2,
  name: '바나나맛 우유',
  notionFolderId: 1,
  content:
    '바나나맛 우유(영어: Banana Flavored Milk)는 대한민국의 유제품 제조 회사 빙그레에서 1974년 6월에 출시한 바나나 가공유다. 1970년대 정부의 낙농업 육성을 위한 우유 소비 장려 정책에 힘입어 개발되었다. \n당시 고급과일의 대명사였던 바나나가 어린이들이 가장 먹고 싶어하는 과일이라는 점에 착안한 제품으로, 항아리 모양의 용기 디자인은 고향을 떠올리게 하기 위한 발상이었다. 당시에는 쥐기 힘들고 보관이 불편하다는 반대 의견도 있었다. \n독특한 용기 모양으로 단지우유 라는 애칭으로 불리며 하루 평균 80만개 이상, 연 2억 5만개 이상 판매되고 있다. 1998년 300억원, 2001년 600억원대의 매출을 기록한 데에 이어 가공유 제품으로는 사상 최초로 단일 브랜드로 연매출 1000억원대 기록을 달성했고, 2011년에는 연 1500억원의 매출을 기록했다. 가공유 시장에서 시장점유율 80%를 차지하고 있다. 2004년부터 미국, 캐나다, 중국 등 10여개 국가에 수출되고 있다. 국내 유제품 최초로 일본 시장에 진출해 편의점 로손의 8000개 점포에 입점했다. \n2006년 건강을 생각하는 젊은층을 타깃으로 지방함량을 1.5% 낮추고 당지수가 낮은 결정과당을 사용한 바나나맛 라이트가 출시된 데에 이어, 2012년 호두, 아몬드 등 견과류의 고소한 맛을 더한 "바나나맛 우유&토피넛"이 출시되었다. 바나나맛 우유&토피넛은 기존 제품과 동일한 용기 디자인에 브랜드 로고의 색깔이 다르다.2018년, "세상에 없던 우유" 시리즈 중 오디맛 우유를 출시했다.',
  relatedNotions: [
    {
      id: 4,
      name: '바나나',
    },
  ],
};

export const mockNotionSnowWhite: Notion = {
  id: 3,
  name: '백설공주',
  notionFolderId: 1,
  content:
    '살결이 매우 하얗게 태어난 백설 공주라 불리게 된 아이는 예쁜 얼굴과 고운 마음씨 때문에 사람들에게 사랑을 받고 자라지만, 어머니가 돌아가시고 새어머니를 맞으면서 이쁘다는 이유로 목숨을 위협당한다.',
  relatedNotions: [
    {
      id: 5,
      name: '사과',
    },
  ],
};

export const mockNotionBanana: Notion = {
  id: 4,
  name: '바나나',
  notionFolderId: 1,
  content: '노랗고 달달한 더운 지역에서 재배되는 과일',
  relatedNotions: [
    {
      id: 1,
      name: '원숭이',
    },
    {
      id: 2,
      name: '바나나맛 우유',
    },
    {
      id: 5,
      name: '사과',
    },
  ],
};

export const mockNotionApple: Notion = {
  id: 5,
  name: '사과',
  notionFolderId: 1,
  content: '빨갛고 동그란, 나무에 열리는 과실',
  relatedNotions: [
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

export const mockNotionSalmon: Notion = {
  id: 6,
  name: '연어',
  notionFolderId: 1,
  content:
    '연어는 연어목 연어과에 속하는 어류이다. 또한 어린 연어는 연어사리라 부른다.',
  relatedNotions: [
    {
      id: 7,
      name: '곰',
    },
  ],
};

export const mockNotionBear: Notion = {
  id: 7,
  name: '곰',
  notionFolderId: 1,
  content: '겨울잠을 자는 크고 힘이 쎈 동물',
  relatedNotions: [
    {
      id: 6,
      name: '연어',
    },
  ],
};

const mockNotionList = [
  mockNotionMonkey,
  mockNotionBananaMilk,
  mockNotionSnowWhite,
  mockNotionBanana,
  mockNotionApple,
  mockNotionSalmon,
  mockNotionBear,
];

export const findMockNotionItem = (targetId: number) => {
  return mockNotionList.find(({ id }) => id === targetId);
};
