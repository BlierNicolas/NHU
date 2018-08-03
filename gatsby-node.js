const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators
	return new Promise((resolve, reject) => {
		const indexTemplate = path.resolve('src/templates/index.js')
		const chapitreTemplate = path.resolve('src/templates/chapitre.js')
		const romanTemplate = path.resolve('src/templates/roman.js')
		const personnageTemplate = path.resolve('src/templates/personnage.js')
		const pouvoirTemplate = path.resolve('src/templates/pouvoir.js')
		const nouvelleTemplate = path.resolve('src/templates/nouvelle.js')
		const groupeTemplate = path.resolve('src/templates/groupe.js')
		const theorieTemplate = path.resolve('src/templates/theorie.js')
		const listeHistoireTemplate = path.resolve('src/templates/histoires.js')
		const progressionTemplate = path.resolve('src/templates/progression.js')
		const listePersonnageTemplate = path.resolve('src/templates/personnages.js')
		const listePouvoirTemplate = path.resolve('src/templates/pouvoirs.js')
		const listeNouvelleTemplate = path.resolve('src/templates/nouvelles.js')
		const listeGroupeTemplate = path.resolve('src/templates/groupes.js')
		const listeTheorieTemplate = path.resolve('src/templates/encyclopedie.js')
		const nombreTemplate = path.resolve('src/templates/nombre.js')
		const calendrierTemplate = path.resolve('src/templates/calendrier.js')
		const contributeursTemplate = path.resolve('src/templates/contributeurs.js')
		const mondeTemplate = path.resolve('src/templates/monde.js')
		const paysTemplate = path.resolve('src/templates/pays.js')
		const villeTemplate = path.resolve('src/templates/ville.js')
		const evenementsTemplate = path.resolve('src/templates/evenements.js');

		resolve(
			createPage({
				path: '/',
				component: indexTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			graphql(
				`{
				allContentfulChapitre(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulChapitre.edges.forEach((edge) => {
					if ((edge.node.id = 'Chapitre') && (edge.node.slug != null)) {
						createPage({
							path: 'histoires/chapitre/' + edge.node.slug,
							component: chapitreTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulRoman(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulRoman.edges.forEach((edge) => {
					if ((edge.node.id = 'Roman') && (edge.node.slug != null)) {
						createPage({
							path: 'histoires/' + edge.node.slug,
							component: romanTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'histoires',
				component: listeHistoireTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'progression',
				component: progressionTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'personnages',
				component: listePersonnageTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'pouvoirs',
				component: listePouvoirTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'nouvelles',
				component: listeNouvelleTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'groupes',
				component: listeGroupeTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'encyclopedie',
				component: listeTheorieTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'nombre',
				component: nombreTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			graphql(
				`{
				allContentfulPersonnage(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPersonnage.edges.forEach((edge) => {
					if ((edge.node.id = 'Personnage') && (edge.node.slug != null)) {
						createPage({
							path: 'personnages/' + edge.node.slug,
							component: personnageTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulPouvoir(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPouvoir.edges.forEach((edge) => {
					if ((edge.node.id = 'Pouvoir') && (edge.node.slug != null)) {
						createPage({
							path: 'pouvoirs/' + edge.node.slug,
							component: pouvoirTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulNouvelle(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulNouvelle.edges.forEach((edge) => {
					if ((edge.node.id = 'Nouvelle') && (edge.node.slug != null)) {
						createPage({
							path: 'nouvelles/' + edge.node.slug,
							component: nouvelleTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulGroupe(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
							nomGroupe
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulGroupe.edges.forEach((edge) => {
					if ((edge.node.id = 'Groupe') && (edge.node.slug != null)) {
						createPage({
							path: 'groupes/' + edge.node.slug,
							component: groupeTemplate,
							context: {
								slug: edge.node.slug,
								nomGroupe: edge.node.nomGroupe,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulTheorie(filter: {node_locale: {eq: "fr-CA"}}) {
					edges {
						node {
							id
							slug
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulTheorie.edges.forEach((edge) => {
					if ((edge.node.id = 'Theorie') && (edge.node.slug != null)) {
						createPage({
							path: 'encyclopedie/' + edge.node.slug,
							component: theorieTemplate,
							context: {
								slug: edge.node.slug,
								lang: "fr-CA"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'calendrier',
				component: calendrierTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'contributeurs',
				component: contributeursTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			// graphql(
			// 	`{
			// 	allContentfulMonde(filter: {node_locale: {eq: "fr-CA"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulMonde.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Monde') && (edge.node.slug != null)) {
			// 			if (edge.node.slug == 'giervia') {
			// 				createPage({
			// 					path: edge.node.slug,
			// 					component: mondeTemplate,
			// 					context: {
			// 						slug: edge.node.slug,
			//						lang: "fr-CA"
			// 					}
			// 				})
			// 			}
			// 		}
			// 	})
			// 	return
			// }),
			// graphql(
			// 	`{
			// 	allContentfulPays(filter: {node_locale: {eq: "fr-CA"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulPays.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Pays') && (edge.node.slug != null)) {
			// 			createPage({
			// 				path: 'giervia/' + edge.node.slug,
			// 				component: paysTemplate,
			// 				context: {
			// 					slug: edge.node.slug,
			//					lang: "fr-CA"
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			// graphql(
			// 	`{
			// 	allContentfulVille(filter: {node_locale: {eq: "fr-CA"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				slugPaysParent
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulVille.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Ville') && (edge.node.slug != null)) {
			// 			createPage({
			// 				path: 'giervia/' + edge.node.slugPaysParent + '/' + edge.node.slug,
			// 				component: villeTemplate,
			// 				context: {
			// 					slug: edge.node.slug,
			//					lang: "fr-CA"
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			createPage({
				path: 'evenements',
				component: evenementsTemplate,
				context: {
					lang: "fr-CA"
				}
			}),
			createPage({
				path: 'en',
				component: indexTemplate,
				context: {
					lang: "en-US"
				}
			}),
			createPage({
				path: 'en/news',
				component: listeNouvelleTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulNouvelle(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulNouvelle.edges.forEach((edge) => {
					if ((edge.node.id = 'Nouvelle') && (edge.node.slug != null)) {
						createPage({
							path: 'en/news/' + edge.node.slug,
							component: nouvelleTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/stories',
				component: listeHistoireTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulRoman(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulRoman.edges.forEach((edge) => {
					if ((edge.node.id = 'Roman') && (edge.node.slug != null)) {
						createPage({
							path: 'en/stories/' + edge.node.slug,
							component: romanTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			graphql(
				`{
				allContentfulChapitre(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulChapitre.edges.forEach((edge) => {
					if ((edge.node.id = 'Chapitre') && (edge.node.slug != null)) {
						createPage({
							path: 'en/stories/chapter/' + edge.node.slug,
							component: chapitreTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/calendar',
				component: calendrierTemplate,
				context: {
					lang: "en-US"
				}
			}),
			createPage({
				path: 'en/progression',
				component: progressionTemplate,
				context: {
					lang: "en-US"
				}
			}),
			createPage({
				path: 'en/characters',
				component: listePersonnageTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulPersonnage(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPersonnage.edges.forEach((edge) => {
					if ((edge.node.id = 'Personnage') && (edge.node.slug != null)) {
						createPage({
							path: 'en/characters/' + edge.node.slug,
							component: personnageTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/powers',
				component: listePouvoirTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulPouvoir(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				result.data.allContentfulPouvoir.edges.forEach((edge) => {
					if ((edge.node.id = 'Pouvoir') && (edge.node.slug != null)) {
						createPage({
							path: 'en/powers/' + edge.node.slug,
							component: pouvoirTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/groups',
				component: listeGroupeTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulGroupe(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
							nomGroupe
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulGroupe.edges.forEach((edge) => {
					if ((edge.node.id = 'Groupe') && (edge.node.slug != null)) {
						createPage({
							path: 'en/groups/' + edge.node.slug,
							component: groupeTemplate,
							context: {
								slug: edge.node.slug,
								nomGroupe: edge.node.nomGroupe,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			// graphql(
			// 	`{
			// 	allContentfulMonde(filter: {node_locale: {eq: "en-US"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulMonde.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Monde') && (edge.node.slug != null)) {
			// 			if (edge.node.slug == 'giervia') {
			// 				createPage({
			// 					path: "en/" + edge.node.slug,
			// 					component: mondeTemplate,
			// 					context: {
			// 						slug: edge.node.slug,
			//						lang: "en-US"
			// 					}
			// 				})
			// 			}
			// 		}
			// 	})
			// 	return
			// }),
			// graphql(
			// 	`{
			// 	allContentfulPays(filter: {node_locale: {eq: "en-US"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulPays.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Pays') && (edge.node.slug != null)) {
			// 			createPage({
			// 				path: 'en/giervia/' + edge.node.slug,
			// 				component: paysTemplate,
			// 				context: {
			// 					slug: edge.node.slug,
			//					lang: "en-US"
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			// graphql(
			// 	`{
			// 	allContentfulVille(filter: {node_locale: {eq: "en-US"}}) {
			// 		edges {
			// 			node {
			// 				id
			// 				slug
			// 				slugPaysParent
			// 				node_locale
			// 			}
			// 		}
			// 	}
			// 	}`
			// ).then((result) => {
			// 	if (result.errors) {
			// 		reject(result.errors)
			// 	}
			// 	result.data.allContentfulVille.edges.forEach((edge) => {
			// 		if ((edge.node.id = 'Ville') && (edge.node.slug != null)) {
			// 			createPage({
			// 				path: 'en/giervia/' + edge.node.slugPaysParent + '/' + edge.node.slug,
			// 				component: villeTemplate,
			// 				context: {
			// 					slug: edge.node.slug,
			//					lang: "en-US"
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			createPage({
				path: 'en/encyclopedia',
				component: listeTheorieTemplate,
				context: {
					lang: "en-US"
				}
			}),
			graphql(
				`{
				allContentfulTheorie(filter: {node_locale: {eq: "en-US"}}) {
					edges {
						node {
							id
							slug
							node_locale
						}
					}
				}
			}`
			).then((result) => {
				if (result.errors) {
					reject(result.errors)
				}
				this.test = 0;
				result.data.allContentfulTheorie.edges.forEach((edge) => {
					if ((edge.node.id = 'Theorie') && (edge.node.slug != null)) {
						createPage({
							path: 'en/encyclopedia/' + edge.node.slug,
							component: theorieTemplate,
							context: {
								slug: edge.node.slug,
								lang: "en-US"
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/events',
				component: evenementsTemplate,
				context: {
					lang: "en-US"
				}
			}),
			createPage({
				path: 'en/number',
				component: nombreTemplate,
				context: {
					lang: "en-US"
				}
			}),
			createPage({
				path: 'en/contributors',
				component: contributeursTemplate,
				context: {
					lang: "en-US"
				}
			})
		)
	})
}

