const path = require('path')

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
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
		const listeProjetsTemplate = path.resolve('src/templates/projets.js')
		const projetTemplate = path.resolve('src/templates/projet.js')

		function singlePage(pat, temp, lang) {
			createPage({
				path: pat,
				component: temp,
				context: {
					lang: lang
				}
			})
		}

		function multiPage(graphQL, kindData, pat, temp, lang) {
			graphql(graphQL).then((result) => {
				if (result.errors) { reject(result.errors) }
				dat = detectKindOfData(result)
				if (dat != null) {
					dat.edges.forEach((edge) => {
						if ((edge.node.id = kindData) && (edge.node.slug != null)) {
							createPage({
								path: pat + edge.node.slug,
								component: temp,
								context: {
									slug: edge.node.slug,
									lang: lang
								}
							})
						}
					})
				}
				return
			})
		}

		function multiPageSpe(graphQL, kindData, pat, temp, lang) {
			graphql(graphQL).then((result) => {
				if (result.errors) { reject(result.errors) }
				dat = detectKindOfData(result)
				if (dat != null) {
					dat.edges.forEach((edge) => {
						if ((edge.node.id = kindData) && (edge.node.slug != null)) {
							if (edge.node.slug == 'giervia') {
								createPage({
									path: pat + edge.node.slug,
									component: temp,
									context: {
										slug: edge.node.slug,
										lang: lang
									}
								})
							}
						}
					})
				}
				return
			})
		}

		function multiPageSpe2(graphQL, kindData, pat, temp, lang) {
			graphql(graphQL).then((result) => {
				if (result.errors) { reject(result.errors) }
				dat = detectKindOfData(result)
				if (dat != null) {
					dat.edges.forEach((edge) => {
						if ((edge.node.id = kindData) && (edge.node.slug != null)) {
							createPage({
								path: pat + edge.node.slugPaysParent + '/' + edge.node.slug,
								component: temp,
								context: {
									slug: edge.node.slug,
									lang: lang
								}
							})
						}
					})
				}
				return
			})
		}

		function detectKindOfData(res) {
			if (res.data.allContentfulChapitre != null) { return res.data.allContentfulChapitre }
			if (res.data.allContentfulRoman != null) { return res.data.allContentfulRoman }
			if (res.data.allContentfulPersonnage != null) { return res.data.allContentfulPersonnage }
			if (res.data.allContentfulGroupe != null) { return res.data.allContentfulGroupe }
			if (res.data.allContentfulNouvelle != null) { return res.data.allContentfulNouvelle }
			if (res.data.allContentfulPouvoir != null) { return res.data.allContentfulPouvoir }
			if (res.data.allContentfulProject != null) { return res.data.allContentfulProject }
			if (res.data.allContentfulTheorie != null) { return res.data.allContentfulTheorie }
			if (res.data.allContentfulMonde != null) { return res.data.allContentfulMonde }
			if (res.data.allContentfulPays != null) { return res.data.allContentfulPays }
			if (res.data.allContentfulVille != null) { return res.data.allContentfulVille }
			return null
		}

		resolve(
			singlePage('/', indexTemplate, "fr-CA"),
			singlePage('en', indexTemplate, "en-US"),
			multiPage(`{allContentfulChapitre(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug}}}}`, 'Chapitre', 'histoires/chapitre/', chapitreTemplate, "fr-CA"),
			multiPage(`{allContentfulChapitre(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug}}}}`, 'Chapitre', 'en/stories/chapter/', chapitreTemplate, "en-US"),
			multiPage(`{allContentfulRoman(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug}}}}`, 'Roman', 'histoires/', romanTemplate, "fr-CA"),
			multiPage(`{allContentfulRoman(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug}}}}`, 'Roman', 'en/stories/', romanTemplate, "en-US"),
			singlePage('histoires', listeHistoireTemplate, "fr-CA"),
			singlePage('en/stories', listeHistoireTemplate, "en-US"),
			singlePage('calendrier', calendrierTemplate, "fr-CA"),
			singlePage('en/calendar', calendrierTemplate, "en-US"),
			singlePage('progression', progressionTemplate, "fr-CA"),
			singlePage('en/progression', progressionTemplate, "en-US"),
			singlePage('projets', listeProjetsTemplate, "fr-CA"),
			singlePage('en/projects', listeProjetsTemplate, "en-US"),
			multiPage(`{allContentfulProject(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug node_locale}}}}`, 'Project', 'projets/', projetTemplate, "fr-CA"),
			multiPage(`{allContentfulProject(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Project', 'en/projects/', projetTemplate, "en-US"),
			singlePage('personnages', listePersonnageTemplate, "fr-CA"),
			singlePage('en/characters', listePersonnageTemplate, "en-US"),
			multiPage(`{allContentfulPersonnage(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug}}}}`, 'Personnage', 'personnages/', personnageTemplate, "fr-CA"),
			multiPage(`{allContentfulPersonnage(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug}}}}`, 'Personnage', 'en/characters/', personnageTemplate, "en-US"),
			singlePage('pouvoirs', listePouvoirTemplate, "fr-CA"),
			singlePage('en/powers', listePouvoirTemplate, "en-US"),
			multiPage(`{allContentfulPouvoir(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug}}}}`, 'Pouvoir', 'pouvoirs/', pouvoirTemplate, "fr-CA"),
			multiPage(`{allContentfulPouvoir(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug}}}}`, 'Pouvoir', 'en/powers/', pouvoirTemplate, "en-US"),
			singlePage('nouvelles', listeNouvelleTemplate, "fr-CA"),
			singlePage('en/news', listeNouvelleTemplate, "en-US"),
			multiPage(`{allContentfulNouvelle(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug node_locale}}}}`, 'Nouvelle', 'nouvelles/', nouvelleTemplate, "fr-CA"),
			multiPage(`{allContentfulNouvelle(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Nouvelle', 'en/news/', nouvelleTemplate, "en-US"),
			singlePage('groupes', listeGroupeTemplate, "fr-CA"),
			singlePage('en/groups', listeGroupeTemplate, "en-US"),
			multiPage(`{allContentfulGroupe(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug node_locale }}}}`, 'Groupe', 'groupes/', groupeTemplate, "fr-CA"),
			multiPage(`{allContentfulGroupe(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Groupe', 'en/groups/', groupeTemplate, "en-US"),
			// multiPageSpe(`{allContentfulMonde(filter: {node_locale: {eq: "fr-CA"}}) {edges {node { id slug node_locale}}}}`, 'Monde', '', mondeTemplate, "fr-CA"),
			// multiPageSpe(`{allContentfulMonde(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Monde', "en/", mondeTemplate, "en-US"),
			// multiPage(`{allContentfulPays(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug node_locale}}}}`, 'Pays', 'giervia/', paysTemplate, "fr-CA"),
			// multiPage(`{allContentfulPays(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Pays', 'en/giervia/', paysTemplate, "en-US"),
			// multiPageSpe2(`{allContentfulVille(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug slugPaysParent node_locale}}}}`, 'Ville', 'giervia/', villeTemplate, "fr-CA"),
			// multiPageSpe2(`{allContentfulVille(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug slugPaysParent node_locale}}}}`, 'Ville', 'en/giervia/', villeTemplate, "en-US"),
			singlePage('evenements', evenementsTemplate, "fr-CA"),
			singlePage('en/events', evenementsTemplate, "en-US"),
			singlePage('nombre', nombreTemplate, "fr-CA"),
			singlePage('en/number', nombreTemplate, "en-US"),
			singlePage('contributeurs', contributeursTemplate, "fr-CA"),
			singlePage('en/contributors', contributeursTemplate, "en-US"),
			singlePage('encyclopedie', listeTheorieTemplate, "fr-CA"),
			singlePage('en/encyclopedia', listeTheorieTemplate, "en-US"),
			multiPage(`{allContentfulTheorie(filter: {node_locale: {eq: "fr-CA"}}) {edges {node {id slug node_locale}}}}`, 'Theorie', 'encyclopedie/', theorieTemplate, "fr-CA"),
			multiPage(`{allContentfulTheorie(filter: {node_locale: {eq: "en-US"}}) {edges {node {id slug node_locale}}}}`, 'Theorie', 'en/encyclopedia/', theorieTemplate, "en-US")
		)
	})
}