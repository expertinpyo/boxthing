/** @jsxImportSource @emotion/react */

import { useRecoilValue } from "recoil"
import { remainState } from "../../store/water"

const WaterInfo = () => {
  const drinked = useRecoilValue(remainState)

  return <div>{drinked}</div>
}

export default WaterInfo
