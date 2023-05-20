import React, { createContext, useContext } from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import Chem from "../components/chem"
import Tag from "../components/tag"
import Box from "../components/box"
import Reveal from "../components/reveal"
import { Link, Script } from "gatsby"

import "../styles/katex.css"
import "../styles/main.scss"

import * as styles from "../styles/notes.module.scss"

require("katex/dist/katex.min.css")

const FootnoteContext = createContext([])

const Footnote = ({ id }) => {
  const footnotes = useContext(FootnoteContext)

  const findIndex = id => {
    for (const [index, footnote] of footnotes.entries()) {
      if (id === footnote.id) {
        return index + 1
      }
    }
    return -1
  }

  const index = findIndex(id)

  if (index > 0) {
    return <sup className={styles.footnoteItem}>{findIndex(id)}</sup>
  }

  return <></>
}

const Mark = ({ children }) => {
  const markStyles = {
    color: "blue",
  }
  return <span style={markStyles}>{children}</span>
}

const shortcodes = { C: Chem, T: Tag, Link, Box, Footnote, Reveal, Mark }

export default function PageTemplate({ data: { mdx }, children }) {
  console.log(mdx)

  return (
    <>
      <FootnoteContext.Provider value={mdx.frontmatter.footnotes}>
        <div className={styles.mainContainer}>
          <MDXProvider components={shortcodes}>{children}</MDXProvider>

          {mdx.frontmatter.footnotes && (
            <div className={styles.footnotes}>
              {mdx.frontmatter.footnotes?.map((footnote, idx) => (
                <p>
                  <sup className={styles.footnoteItem}>{idx + 1}</sup>
                  <span dangerouslySetInnerHTML={{ __html: footnote.html }} />
                </p>
              ))}
            </div>
          )}
        </div>
      </FootnoteContext.Provider>
    </>
  )
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        footnotes {
          id
          html
        }
      }
    }
  }
`
