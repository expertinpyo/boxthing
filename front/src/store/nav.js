import { atom, selector } from "recoil"
import GitBox from "../component/Box/GitBox"
import HealthBox from "../component/Box/HealthBox"
import PlanBox from "../component/Box/PlanBox"
import WorkBox from "../component/Box/WorkBox"

// const navState = atom({
//   key: "navState",
//   default: 0,
// })

// const selectedContentState = selector({
//   key: "selectedContentState",
//   get: ({ get }) => {
//     const selected = get(navState)

//     switch (selected) {
//       case 0:
//         return <PlanBox />
//       case 1:
//         return <GitBox />
//       case 2:
//         return <WorkBox />
//       case 3:
//         return <HealthBox />
//       default:
//         return false
//     }
//   },
// })

const waterModalState = atom({
  key: "waterModalState",
  default: false,
})

const stretchModalState = atom({
  key: "stretchModalState",
  default: false,
})

const postureModalState = atom({
  key: "postureModalState",
  default: false,
})

export { waterModalState, stretchModalState, postureModalState }
