import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Button,
    Card,
    CardImg,
    CardText,
    CardDeck,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
    Jumbotron
} from 'reactstrap';
import classnames from 'classnames';

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = { nightMode: false, status: 'inactif' };

        this.checkActif();
    }

    checkActif() {
        console.log(this.state.nightMode);
        if (this.state.nightMode) {
            document.body.classList.add('darkClass')
        } else {
            document.body.classList.remove('darkClass')
        }
        console.log("Night mode " + this.state.status);
    }

    render() {
        const {
            data
        } = this.props

        return (
            <div>
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
                        <Col sm="12" lg="9" >
                            <h2 className="mb-4">
                                Dernières nouvelles
                    </h2>
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
                                                        <span className="float-right"><small>{edge.node.date}</small></span>
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
                        <Col sm="12" lg="3" >
                            {/* <aside className="">
                        <h2 className="mb-4">Le Nic</h2>

                        <p>
                            lorem  
                        </p>
                    </aside> */}
                        </Col>
                    </Row>
                </Container>
            </div>
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
          date(formatString: "YYYY MMMM DD")
          slug
        }
      }
    }
  }`