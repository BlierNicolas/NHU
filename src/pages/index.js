import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import Block_Nouvelles from '../components/block_nouvelles';
import Block_Calendrier from '../components/block_calendrier';

class IndexPage extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div>
                <Header />

                <div className="equiv">
                    <Link className="text-white" to="/en"><Button className="float-right" color="primary">En</Button></Link>
                </div>

                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">L'Univers des Nouveaux Humains</h1>
                        <p className="lead">L'Univers des Nouveaux Humains est un Univers fictif où 0.01% de la population mondiale possède des pouvoirs.</p>
                        <p className="lead">Les pouvoirs sont détectables via un gène qui a été nommé le gène Drumel, au nom du scientifique qui a identifié les différents cas et possibilités de ce gène.</p>
                        <Link className="btn btn-primary" to="/histoires">Entrer dans l'Univers</Link>
                    </Container>
                </Jumbotron>

                <Container fluid className="p-0">
                    <Row className="pb-5">
                        <Col sm="12" lg="8" >
                            <h2 className="mb-4">Dernières nouvelles</h2>
                            <Block_Nouvelles allNouvelles={data.allContentfulNouvelle} />
                        </Col>
                        <Col sm="12" lg="4" >
                            <h2 className="mb-4">Prochaines sorties</h2>
                            <Block_Calendrier allCalendrier={data.allContentfulCalendrier} />
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h2 className="mb-4">La création de l'Univers</h2>
                            <p>J'ai commencé à créer l'Univers autour de Janvier 2015, la première histoire que j'ai écrite était <a href="/histoires/le-premier-cyborg-tome-1">Le Premier Cyborg</a>, après le premier tome, j'ai commencé à écrire une suite.</p>
                            <p>Rapidement, l'Univers a prit de l'expension, entraînant la création de plusieurs personnages, pouvoirs et groupes. Les concepts ce sont détaillés au fur et à mesure que le temps avançait.</p>
                            <p>Éventuellement, tous les personnages auront leur histoire à raconter et l'Univers continuera de grandir encore et encore.</p>
                        </Col>
                    </Row>
                </Container>

                <Footer />
            </div >
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`query listeNouvelleQueryFR {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "fr-CA"}}) {
      edges {
        node {
          id
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY-MM-DD")
          dateSpe
          slug
        }
      }
    }
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
                romanSlug
                affiche
			}
		}
	}
  }`