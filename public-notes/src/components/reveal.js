import React, { useState } from "react"

import * as styles from "../styles/components/box.module.scss"

const Reveal = ({ title, children }) => {
  const [show, setShow] = useState(false)
  return (
    <div>
      <div onClick={() => setShow(!show)} className={styles.title}>
        {title} (click to hide/show)
      </div>

      {show && <div className={styles.box}>{children}</div>}
    </div>
  )
}

export default Reveal
