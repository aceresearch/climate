import React from "react"

import * as styles from "../styles/components/box.module.scss"

const Box = ({ title, children }) => {
  return (
    <div>
      <div className={styles.title}>{title}</div>
      <div className={styles.box}>{children}</div>
    </div>
  )
}

export default Box
