import { atom, selector } from "recoil";

const postureState = atom({
  key: "postureState",
  default: [],
});

const postureAvgState = selector({
  key: "postureAvgState",
  get: ({ get }) => {
    const list = get(postureState);
    const length = list.length;
    if (length === 0) return 0;
    let sum = 0;
    list.forEach((item) => {
      sum += Number.parseInt(item["posture_score"]);
    });
    return (sum / length).toFixed(1);
  },
});

const currentPostureScoreState = selector({
  key: "currentPostureScoreState",
  get: ({ get }) => {
    const list = get(postureState);

    let score = 0;
    if (list.length !== 0) score = list[list.length - 1]["posture_score"];

    return score;
  },
});

const runtimePostureState = selector({
  key: "runtimePostureState",
  get: ({ get }) => {
    const list = get(postureState);
    let idx = list.length - 20;
    if (idx < 0) return list;
    else return list.slice(idx);
  },
});

export {
  postureState,
  currentPostureScoreState,
  runtimePostureState,
  postureAvgState,
};
// [{"send_posture_flag": 1(정상) or 2(거북목) or 3(허리무리) or 4(자리비움), "posture_score": 60 ~ 100 or -1}, {}, {}]
// 80점 이상이 보통 정상일 것