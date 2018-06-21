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
				allContentfulNouvelle {
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
				console.log(result);
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
				allContentfulGroupe {
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
				console.log(result);
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
				allContentfulTheorie {
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
				console.log(result);
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
			})
		)
	})
}

