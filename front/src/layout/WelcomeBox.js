/** @jsxImportSource @emotion/react */

import Logo from "../asset/logo.png"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { loginState } from "../store/nav"

const WelcomeBox = () => {
  const setLogin = useSetRecoilState(loginState)

  useEffect(() => {
    setTimeout(() => {
      setLogin(true)
    }, 3000)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      css={{ width: "100%", height: "100%" }}
    >
      <div css={{ width: "30%" }}>
        <img src={Logo} alt="logo" css={{ width: "100%", borderRadius: 16 }} />
      </div>
      <div>Welcome</div>
    </motion.div>
  )
}

export default WelcomeBox
