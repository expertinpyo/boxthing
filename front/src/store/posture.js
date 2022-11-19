import { atom, selector } from "recoil";

const postureState = atom({
  key: "postureState",
  default: [],
});

const postureAvgState = selector({
  key: "postureAvgState",
  get: ({ get }) => {
    const list = get(postureState);
    let length = list.length;
    if (length === 0) return 0;
    let sum = 0;
    list.forEach((item) => {
      const temp = Number.parseInt(item["posture_score"]);
      if (temp !== 0) sum += Number.parseInt(item["posture_score"]);
      else length--;
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

const cameraConnectionState = atom({
  key: "cameraConnectionState",
  default: false,
});

export {
  postureState,
  currentPostureScoreState,
  postureAvgState,
  cameraConnectionState,
};
// [{"send_posture_flag": 1(정상) or 2(거북목) or 3(허리무리) or 4(자리비움), "posture_score": 60 ~ 100 or -1}, {}, {}]
// 80점 이상이 보통 정상일 것
