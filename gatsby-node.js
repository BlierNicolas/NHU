const path = require('path')

exports.createPages = ({ graphql, boundActionCreators }) => {
	const { createPage } = boundActionCreators
	return new Promise((resolve, reject) => {
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

		const indexEnTemplate = path.resolve('src/templates/en.js')
		const chapitreEnTemplate = path.resolve('src/templates/chapter.en.js')
		const romanEnTemplate = path.resolve('src/templates/story.en.js')
		const personnageEnTemplate = path.resolve('src/templates/character.en.js')
		const pouvoirEnTemplate = path.resolve('src/templates/power.en.js')
		const nouvelleEnTemplate = path.resolve('src/templates/new.en.js')
		const groupeEnTemplate = path.resolve('src/templates/group.en.js')
		const theorieEnTemplate = path.resolve('src/templates/theory.en.js')
		const listeHistoireEnTemplate = path.resolve('src/templates/stories.en.js')
		const progressionEnTemplate = path.resolve('src/templates/progression.en.js')
		const listePersonnageEnTemplate = path.resolve('src/templates/characters.en.js')
		const listePouvoirEnTemplate = path.resolve('src/templates/powers.en.js')
		const listeNouvelleEnTemplate = path.resolve('src/templates/news.en.js')
		const listeGroupeEnTemplate = path.resolve('src/templates/groups.en.js')
		const listeTheorieEnTemplate = path.resolve('src/templates/encyclopedia.en.js')
		const nombreEnTemplate = path.resolve('src/templates/number.en.js')
		const calendrierEnTemplate = path.resolve('src/templates/calendar.en.js')
		const contributeursEnTemplate = path.resolve('src/templates/contributors.en.js')
		const mondeEnTemplate = path.resolve('src/templates/world.en.js')
		const paysEnTemplate = path.resolve('src/templates/country.en.js')
		const villeEnTemplate = path.resolve('src/templates/city.en.js')

		resolve(
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
								slug: edge.node.slug
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
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'histoires',
				component: listeHistoireTemplate
			}),
			createPage({
				path: 'progression',
				component: progressionTemplate
			}),
			createPage({
				path: 'personnages',
				component: listePersonnageTemplate
			}),
			createPage({
				path: 'pouvoirs',
				component: listePouvoirTemplate
			}),
			createPage({
				path: 'nouvelles',
				component: listeNouvelleTemplate
			}),
			createPage({
				path: 'groupes',
				component: listeGroupeTemplate
			}),
			createPage({
				path: 'encyclopedie',
				component: listeTheorieTemplate
			}),
			createPage({
				path: 'nombre',
				component: nombreTemplate
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
								slug: edge.node.slug
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
								slug: edge.node.slug
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
								slug: edge.node.slug
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
								nomGroupe: edge.node.nomGroupe
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
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'calendrier',
				component: calendrierTemplate
			}),
			createPage({
				path: 'contributeurs',
				component: contributeursTemplate
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
			// 						slug: edge.node.slug
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
			// 					slug: edge.node.slug
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
			// 					slug: edge.node.slug
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			createPage({
				path: 'en',
				component: indexEnTemplate
			}),
			createPage({
				path: 'en/news',
				component: listeNouvelleEnTemplate
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
							component: nouvelleEnTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/stories',
				component: listeHistoireEnTemplate
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
							component: romanEnTemplate,
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
							component: chapitreEnTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/calendar',
				component: calendrierEnTemplate
			}),
			createPage({
				path: 'en/progression',
				component: progressionEnTemplate
			}),
			createPage({
				path: 'en/characters',
				component: listePersonnageEnTemplate
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
							component: personnageEnTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/powers',
				component: listePouvoirEnTemplate
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
							component: pouvoirEnTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/groups',
				component: listeGroupeEnTemplate
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
							component: groupeEnTemplate,
							context: {
								slug: edge.node.slug,
								nomGroupe: edge.node.nomGroupe
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
			// 					component: mondeEnTemplate,
			// 					context: {
			// 						slug: edge.node.slug
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
			// 				component: paysEnTemplate,
			// 				context: {
			// 					slug: edge.node.slug
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
			// 				component: villeEnTemplate,
			// 				context: {
			// 					slug: edge.node.slug
			// 				}
			// 			})
			// 		}
			// 	})
			// 	return
			// }),
			createPage({
				path: 'en/encyclopedia',
				component: listeTheorieEnTemplate
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
							component: theorieEnTemplate,
							context: {
								slug: edge.node.slug
							}
						})
					}
				})
				return
			}),
			createPage({
				path: 'en/number',
				component: nombreEnTemplate
			}),
			createPage({
				path: 'en/contributors',
				component: contributeursEnTemplate
			})
		)
	})
}

