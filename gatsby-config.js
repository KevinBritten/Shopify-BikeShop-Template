require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  siteMetadata: {
    siteTitle: "Courrier Caverne",
    siteTitleDefault: "Courrier Caverne",
    siteUrl: "https://www.courriercaverne.ca",
    siteDescription: "7400 rue Saint-André, Montréal",
    siteImage: "/cc-ogimage.png",
    twitter: "@joperron",
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    {
      resolve: `gatsby-source-shopify-translations`,
      options: {
        shopName: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyPassword: process.env.SHOPIFY_SHOP_PASSWORD,
        accessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
        defaultLang: "en",
        prefixDefault: false,
        configPath: require.resolve("./locales/config.json"),
        locales: ["fr", "en"],
        waitingGatsbySourceShopify: 5000,
        sourceOnlyMode: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-with-attributes`,
      options: {
        fonts: [`Work Sans\:600,800`],
        display: "swap",
        attributes: {
          rel: "stylesheet preload prefetch",
        },
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-netlify",
    //  Add your Google Analytics ID to the .env file to enable
    // Otherwise, this plugin can be removed
    process.env.GOOGLE_ANALYTICS_ID && {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
  ].filter(Boolean),
}
