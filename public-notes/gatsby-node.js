const path = require("path")
const postTemplate = path.resolve(`./src/templates/posts.js`)

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  data.allMdx.nodes.forEach(node => {
    const slug = node.fields.slug
    console.log(slug)

    if (slug == "/index") {
      actions.createPage({
        path: "/",
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id },
      })
    } else {
      actions.createPage({
        path: slug,
        component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: { id: node.id },
      })
    }
  })
}
