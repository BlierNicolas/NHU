module.exports = {
	siteMetadata: {
		title: 'Univers des Nouveaux Humains',
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
		`gatsby-plugin-remove-trailing-slashes`
	],
}
