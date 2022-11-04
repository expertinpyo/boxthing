# Front

test
# 2022-10-23

**문제 상황**

img 태그에 입력으로 넣은 이미지 밑에 작은 빈 공간이 의도치 않게 생겼다.

**해결**

inline 요소의 경우 text를 content로 갖는 경우가 많고, g, j와 같은 글자들을 위한 line-height가 작은 값으로 설정되어있다.

위와 같은 이유로 img 태그 또한 inline 요소이기 때문에, 의도치 않게 이미지 하단에 빈 공간이 생기는 문제가 발생했고, 부모 element에 `line-height: 0` 을 설정해서 문제를 해결했다.

---

**문제 상황**

프로젝트에 들어갈 기능들이 현재 시각을 참조하는 경우가 굉장히 빈번할 것으로 예상되는데, 현재 시각 및 날짜를 화면에 출력해줄 Timer 컴포넌트를 어디에 배치하고, 해당 데이터를 어떻게 관리해야 될지 고민된다.

**해결**

2022-10-24 해결

# 2022-10-24

**문제 상황**

시간 데이터 관리가 메인인 2022-10-23의 두 번째 문제의 연장

**해결**

Recoil을 활용해서 `new Date` 객체를 1초 간격으로 갱신하도록 만들고, 해당 atom을 필요한 component에서 사용하는 것이 직관적이라고 생각했다.

현재 시각 및 날짜를 나타낼 Timer 컴포넌트에서는 `useRecoilValue()` 를 활용해 단순히 객체를 받아다가 문자열을 만들어 화면에 출력시켰다.

오늘의 일정 리스트 또한 Recoil을 활용해 atom에 저장했는데, `selector()` 를 활용해서 일정 리스트 atom 객체와 현재 시각 atom 객체를 의존성으로 주입해서 각 일정 리스트의 시간 데이터와 현재 시각을 비교해서 짧은 간격을 가진 리스트들을 필터링했다.

```javascript
const upcomingPlanListState = selector({
  key: "upcomingPlanList",
  get: ({ get }) => {
    const list = get(planListState)
    const currentTime = get(timeState)

    return list.filter((item) => {
      return item.item.time - currentTime < 1000 * 60 * 30 ? true : false
    })
  },
})
```

문제는 현재 시각의 경우 1초마다 갱신되기 때문에 `selector()` 내의 callback 함수 또한 매번 계산되고 upcomingPlanListState를 구독하는 컴포넌트들 또한 매번 re-render가 될 것이다.

**깨닫다**
일정 리스트의 각 item의 시간 데이터를 현재 시각과 비교해서 upcoming 한 지, inprogress 한 지를 구분하는 코드를 작성하게 되었다.

`selector()` 를 사용해서 upcoming, inprogress 리스트를 계산해내는데, 1초마다 계산이 되고 1초마다 객체가 바뀐다면 해당 객체를 subscribe하는 컴포넌트의 한 부분이 re-render 될 것이라고 판단해 이게 BEST CASE 인지 궁금했다.

컨설턴트 님과의 대화 중 **객체의 주소가 바뀌면, 즉 객체 자체가 바뀌면 re-render가 일어날 것이다!** 라는 말씀을 듣고 불변성에 대한 부분을 다시 remind할 수 있었다.

또한 re-render 되는 것이 더 비용이 드는지, 객체 내용에 변화가 있는지 사전에 로직을 통해 확인하고 변화가 있을 때 새로운 객체를 할당하는 것이 비용이 더 드는지 비교를 해서 결정하는 것이 바람직하다고 말씀하셨다.

지금 당장 생각나는 포인트는 다음과 같다.

1. `selector()` 내에 `get()` 의 경우 저장되어 있는 객체를 얕은 복사해서 주는가? 주소가 같은가?
2. Array filter 함수의 경우 새로운 객체를 반환해줬던가?
3. re-render 관련해서 공부 좀 더 해야겠다!

# 2022-10-27

**문제 상황**

최상단 element의 height를 다양한 환경에서도 동일한 높이를 갖게 하고 싶어서 `height: calc(var(--vh) * 100);`를 사용해 useEffect 내에서 동적으로 설정되게 만들었는데, 아주 미세한 스크롤바가 나타난다. 정확히 100vh랑 동일한 value를 갖지 못하는 것 같다.
