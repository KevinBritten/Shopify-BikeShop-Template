exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for all markdown nodes
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // For each markdown node, create pages for each language
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // List of supported languages
    const languages = ["fr", "en"]

    languages.forEach((lang) => {
      createPage({
        path: `/${lang}${node.fields.slug}`,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
          langKey: lang, // Pass the language as context to be used in the page query
        },
      })
    })
  })
}
