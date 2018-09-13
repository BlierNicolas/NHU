module.exports = {
  siteMetadata: {
    title: 'Gatsby Default Starter',
  },
  plugins: [
		{
			resolve: 'gatsby-source-contentful',
			options: {
				spaceId: 'ssitg7axdkvh',
				accessToken: '3da4bc02391e74028c99ff0a8b28393402ad0d2c8795db8ee46842f0eef38642',
			},
		},
		'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: "UA-122177044-1",
				// Puts tracking script in the head instead of the body
				head: false,
				// Setting this parameter is optional
				anonymize: true,
				// Setting this parameter is also optional
				respectDNT: true,
				// Avoids sending pageview hits from custom paths
				exclude: ["/preview/**", "/do-not-track/me/too/"],
			}
		},
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
}
