import { atom, selector } from "recoil"

const target = 1300

const drinkedState = atom({
  key: "drinkedState",
  default: 500,
})

const reachState = selector({
  key: "reachState",
  get: ({ get }) => {
    const drinked = get(drinkedState)

    return Math.floor((drinked / target) * 100)
  },
})

const remainState = selector({
  key: "remainState",
  get: ({ get }) => {
    const drinked = get(drinkedState)

    return `목표까지 종이컵 ${((1300 - drinked) / 180).toFixed(
      1
    )}컵 남았습니다!`
  },
})

export { drinkedState, reachState, remainState }
