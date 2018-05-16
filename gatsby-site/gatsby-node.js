const path = require('path')

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators
	return new Promise((resolve, reject) => {
		const chapitreTemplate = path.resolve('src/templates/chapitre.js')
		const romanTemplate = path.resolve('src/templates/roman.js')
		const personnageTemplate = path.resolve('src/templates/personnage.js')
		const pouvoirTemplate = path.resolve('src/templates/pouvoir.js')
		const listeHistoireTemplate = path.resolve('src/templates/listeDesHistoires.js')
		const listePersonnageTemplate = path.resolve('src/templates/listeDesPersonnages.js')
		const listePouvoirTemplate = path.resolve('src/templates/listeDesPouvoirs.js')
		
		resolve(
			graphql(
			`{
				allContentfulChapitre {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				console.log(result); 
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulChapitre.edges.forEach((edge) => {
					if (edge.node.id = 'Chapitre') {
						createPage ({
							path: 'Roman/Chapitre/'+edge.node.slug,
							component: chapitreTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			graphql(
			`{
				allContentfulRoman {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				console.log(result); 
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulRoman.edges.forEach((edge) => {
					if (edge.node.id = 'Roman') {
						createPage ({
							path: 'Roman/'+edge.node.slug,
							component: romanTemplate,
							context: {
								slug: edge.node.slug,
								romanSlug: "../"+edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage ({
				path: 'ListeDesHistoires',
				component: listeHistoireTemplate
			}),
			createPage ({
				path: 'ListeDesPersonnages',
				component: listePersonnageTemplate
			}),
			createPage ({
				path: 'ListeDesPouvoirs',
				component: listePouvoirTemplate
			}),
			graphql(
			`{
				allContentfulPersonnage {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				console.log(result); 
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPersonnage.edges.forEach((edge) => {
					if (edge.node.id = 'Personnage') {
						createPage ({
							path: 'Personnage/'+edge.node.slug,
							component: personnageTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			graphql(
			`{
				allContentfulPouvoir {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				console.log(result); 
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPouvoir.edges.forEach((edge) => {
					if (edge.node.id = 'Pouvoir') {
						createPage ({
							path: 'Pouvoir/'+edge.node.slug,
							component: pouvoirTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			})
		)
	})
}

