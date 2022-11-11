import { atom } from "recoil";

const statisticsState = atom({
  key: "statisticsState",
  default: {
    water: [],
    // water: [
    //   { "2022-10-23": 1300 },
    //   { "2022-10-24": 0.0 },
    //   { "2022-10-25": 0.0 },
    //   { "2022-10-26": 0.0 },
    //   { "2022-10-27": 0.0 },
    //   { "2022-10-28": 0.0 },
    //   { "2022-10-29": 0.0 },
    //   { "2022-10-30": 0.0 },
    //   { "2022-10-31": 0.0 },
    //   { "2022-11-01": 0.0 },
    //   { "2022-11-02": 0.0 },
    //   { "2022-11-03": 0.0 },
    //   { "2022-11-04": 24624.2 },
    //   { "2022-11-05": 0.0 },
    //   { "2022-11-06": 1400 },
    // ],
  },
});

export { statisticsState };
