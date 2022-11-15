import { atom, selector } from "recoil";
import { timerState } from "./timer";
import moment from "moment";

const planState = atom({
  key: "planState",
  default: [],
});

const filterPastPlanState = selector({
  key: "filterPastPlanState",
  get: ({ get }) => {
    const list = get(planState);
    const currentTime = get(timerState);

    return list.filter((item) => {
      const temp = moment(item.end.dateTime) - currentTime;
      return temp >= 0;
    });
  },
});

const upcomingPlanState = selector({
  key: "upcomingPlanState",
  get: ({ get }) => {
    const list = get(planState);
    const currentTime = get(timerState);

    return list.filter((item) => {
      const temp = moment(item.start.dateTime) - currentTime;
      return temp < 1000 * 60 * 20 && temp > 0 ? true : false;
    });
  },
});

const upcomingPlanTimerState = selector({
  key: "upcomingPlanTimerState",
  get: ({ get }) => {
    const target = get(upcomingPlanState);
    if (target.length === 0) return false;
    const currentTime = get(timerState);

    const temp = moment(target[0].start.dateTime) - currentTime;
    const hours = Math.floor(temp / (1000 * 60 * 60));
    const minutes = Math.floor((temp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((temp % (1000 * 60)) / 1000);
    const impending = temp < 1000 * 60 * 10;
    // return [
    //   hours.toString().padStart(2, "0"),
    //   minutes.toString().padStart(2, "0"),
    //   seconds.toString().padStart(2, "0"),
    // ]
    return [
      `${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`,
      impending,
    ];
  },
});

const inProgressPlanState = selector({
  key: "inProgressPlanState",
  get: ({ get }) => {
    const list = get(planState);
    const currentTime = get(timerState);

    return list.filter((item) => {
      return currentTime - moment(item.start.dateTime) >= 0 &&
        currentTime - moment(item.end.dateTime) < 0
        ? true
        : false;
    });
  },
});

export {
  planState,
  upcomingPlanState,
  inProgressPlanState,
  upcomingPlanTimerState,
  filterPastPlanState,
};
