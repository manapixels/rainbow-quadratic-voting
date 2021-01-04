module.exports = {
  siteMetadata: {
    title: `🌈 Rainbow Vote`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`, 
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `🌈 Rainbow Vote`,
        short_name: `🌈 Rainbow Vote`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#5318dd`,
        display: `minimal-ui`,
        icon: `src/images/coin.svg`,
      },
    },
  ],
}