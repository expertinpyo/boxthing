import { atom, selector } from "recoil";
import moment from "moment";

const target = 1300;

const drinkedState = atom({
  key: "drinkedState",
  default: [],
  // default: [
  //   { amount: 100, timestamp: "2022-11-08 14:17:20" },
  //   { amount: 130, timestamp: "2022-11-08 15:17:20" },
  //   { amount: 200, timestamp: "2022-11-08 16:17:20" },
  //   { amount: 50, timestamp: "2022-11-08 17:17:20" },
  //   { amount: 120, timestamp: "2022-11-08 18:17:20" },
  //   { amount: 300, timestamp: "2022-11-08 19:17:20" },
  //   { amount: 100, timestamp: "2022-11-08 10:20:20" },
  // ],
});

const drinkedHistoryState = selector({
  key: "drinkedHistoryState",
  get: ({ get }) => {
    const drinkedLog = get(drinkedState);
    let today = moment() - (moment() % (1000 * 60 * 60 * 24)) - 1000 * 60 * 60;
    let result = [];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      for (let j = 0, end = drinkedLog.length; j < end; j++) {
        const temp = drinkedLog[j];
        if (
          moment(temp.timestamp) - 0 >= today + 1000 * 60 * 60 * i &&
          moment(temp.timestamp) - 0 < today + 1000 * 60 * 60 * (i + 1)
        ) {
          sum += Number.parseInt(temp.amount);
        }
      }
      result = [
        ...result,
        {
          when: `${Number.parseInt(8 + i)} - ${Number.parseInt(8 + (i + 1))}`,
          value: sum,
        },
      ];
    }
    return result;
  },
});

const reachState = selector({
  key: "reachState",
  get: ({ get }) => {
    const drinkedLog = get(drinkedState);
    const drinked = drinkedLog.reduce((previous, current) => {
      return Number.parseInt(previous) + Number.parseInt(current.amount);
    }, 0);

    return Math.floor((drinked / target) * 100);
  },
});

const remainState = selector({
  key: "remainState",
  get: ({ get }) => {
    const reached = get(reachState);
    if (reached < 95) {
      return `목표까지 종이컵 ${(
        (1300 * ((100 - reached) / 100)) /
        180
      ).toFixed(1)}컵 남았습니다!`;
    } else if (reached > 105) {
      return `과유불급! 음수량을 조절해주세요!`;
    } else {
      return `수분 섭취 점수 100점!`;
    }
  },
});

export { drinkedState, reachState, remainState, drinkedHistoryState };
