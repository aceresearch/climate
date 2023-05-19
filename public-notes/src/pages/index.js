import * as React from "react"
import { Link } from "gatsby"
import IndexContent from "../content/index.mdx"

import * as styles from "../styles/notes.module.scss"

const IndexPage = () => (
  <div className={styles.mainContainer}>
    <IndexContent />
  </div>
)

export default IndexPage
