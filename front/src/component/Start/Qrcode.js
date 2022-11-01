import { QRCodeSVG } from "qrcode.react"

const Qrcode = ({ link }) => {
  return <QRCodeSVG value={link} size="100%" />
}

export default Qrcode
