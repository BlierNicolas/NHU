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
                            {
                                data.allContentfulNouvelle.edges.map(
                                    (edge) =>
                                        <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            <div className="">
                                                <Row className="no-gutters">
                                                    <Col md="9" sm="12">
                                                        <Link to={'nouvelles/' + edge.node.slug}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
                                                    </Col>

                                                    <Col md="3" sm="12">
                                                        <span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div>
                                                <Row className="no-gutters">
                                                    <Col md="9" sm="12">
                                                        <div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
                                                    </Col>

                                                    <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                        <Link className="float-right mb-2" to={'nouvelles/' + edge.node.slug}>En savoir plus</Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                )
                            }
                        </Col>
                        <Col sm="12" lg="4" >
                            <h2 className="mb-4">Prochaines sorties</h2>
                            {
                                data.allContentfulCalendrier.edges.map(
                                    (edge) =>
                                        <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            {edge.node.affiche ?
                                                (<div>
                                                    <div className="">
                                                        <Row className="no-gutters">
                                                            <Col md="9" sm="12">
                                                                <h3 className="float-left"><small>{edge.node.titre}</small></h3>
                                                            </Col>

                                                            <Col md="3" sm="12">
                                                                <span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <Row className="no-gutters">
                                                            <Col md="9" sm="12">
                                                                <div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
                                                            </Col>

                                                            <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                                <Link className="float-right mb-2" to={edge.node.romanSlug}>Aller voir l'histoire</Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>) :
                                                ('')
                                            }
                                        </div>
                                )
                            }
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