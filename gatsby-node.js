const path = require('path')

exports.createPages = ({graphql, boundActionCreators}) => {
	const {createPage} = boundActionCreators
	return new Promise((resolve, reject) => {
		const chapitreTemplate = path.resolve('src/templates/chapitre.js')
		const romanTemplate = path.resolve('src/templates/roman.js')
		const personnageTemplate = path.resolve('src/templates/personnage.js')
		const pouvoirTemplate = path.resolve('src/templates/pouvoir.js')
		const nouvelleTemplate = path.resolve('src/templates/nouvelle.js')
		const listeHistoireTemplate = path.resolve('src/templates/listeDesHistoires.js')
		const listePersonnageTemplate = path.resolve('src/templates/listeDesPersonnages.js')
		const listePouvoirTemplate = path.resolve('src/templates/listeDesPouvoirs.js')
		const listeNouvelleTemplate = path.resolve('src/templates/listeDesNouvelles.js')
		
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
					if ((edge.node.id = 'Chapitre') && (edge.node.slug != null)) {
						createPage ({
							path: 'roman/chapitre/'+edge.node.slug,
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
					if ((edge.node.id = 'Roman') && (edge.node.slug != null)) {
						createPage ({
							path: 'roman/'+edge.node.slug,
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
				path: 'liste-des-histoires',
				component: listeHistoireTemplate
			}),
			createPage ({
				path: 'liste-des-personnages',
				component: listePersonnageTemplate
			}),
			createPage ({
				path: 'liste-des-pouvoirs',
				component: listePouvoirTemplate
			}),
			createPage ({
				path: 'liste-des-nouvelles',
				component: listeNouvelleTemplate
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
					if ((edge.node.id = 'Personnage') && (edge.node.slug != null)) {
						createPage ({
							path: 'personnage/'+edge.node.slug,
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
					if ((edge.node.id = 'Pouvoir') && (edge.node.slug != null)) {
						createPage ({
							path: 'pouvoir/'+edge.node.slug,
							component: pouvoirTemplate,
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
				allContentfulNouvelle {
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
				result.data.allContentfulNouvelle.edges.forEach((edge) => {
					if ((edge.node.id = 'Nouvelle') && (edge.node.slug != null)) {
						createPage ({
							path: 'nouvelle/'+edge.node.slug,
							component: nouvelleTemplate,
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

