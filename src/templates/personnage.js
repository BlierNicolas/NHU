import React, { Component } from 'react';
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
    Jumbotron,
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
    Breadcrumb,
    BreadcrumbItem,
    TabContent,
    TabPane
} from 'reactstrap';

class Personnage extends Component {
    render() {
        const {
            data
        } = this.props

        return (
            <div>
                <Breadcrumb className="mb-0">
                    <BreadcrumbItem><Link to="/">Page d'accueil</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/personnages">Nos personnages</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{data.contentfulPersonnage.nomComplet}</BreadcrumbItem>
                </Breadcrumb>

                <Container fluid>
                    <Row className="pb-5">
                        <Col lg={{ size: 8, offset: 2 }} md="12">
                            <div className="mt-5 mb-3">
                                <div>
                                    <h1 className="display-4">{data.contentfulPersonnage.nomComplet}</h1>
                                    <div>
                                        Pouvoir: {data.contentfulPersonnage.pouvoirNom}<br />
                                        Alignement: {data.contentfulPersonnage.alignement}<br />
                                        Data de naissance: {data.contentfulPersonnage.dateNaissance}<br />
                                        Âge: {data.contentfulPersonnage.age}
                                    </div>
                                </div>
                            </div>
                            {
                                data.contentfulPersonnage.descriptionSommaire ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Description sommaire</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionSommaire.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.descriptionPouvoir ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Description du pouvoir</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPouvoir.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.descriptionPhysique ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Description physique</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPhysique.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.contentfulPersonnage.relation ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Relations</h3>
                                            <div>
                                                <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.relation.childMarkdownRemark.html }} />
                                            </div>
                                        </div>
                                    </div>) :
                                    ('')
                            }
                            {
                                data.allContentfulApparition ?
                                    (<div className="my-3">
                                        <div>
                                            <h3>Apparitions</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.apparition.childMarkdownRemark.html }} />
                                        </div>
                                    </div>) :
                                    ('')
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

Personnage.propTypes = {
    data: PropTypes.object.isRequired
}

export default Personnage

export const pageQuery = graphql`query personnageQueryFR ($slug: String!) {
    contentfulPersonnage(slug: {eq: $slug}, node_locale: {eq: "fr-CA"}) {
      nomComplet
      prenom
      nom
      dateNaissance
      age
      pouvoirNom
      alignement
      descriptionSommaire {
        childMarkdownRemark {
          html
        }
      }
      descriptionPouvoir {
        childMarkdownRemark {
          html
        }
      }
      descriptionPhysique {
        childMarkdownRemark {
          html
        }
      }
      relation {
        childMarkdownRemark {
          html
        }
      }
      apparition {
        childMarkdownRemark {
          html
        }
      }
      typeGene
      slug
    }
    allContentfulApparition(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "fr-CA"}, personnageSlug: {eq: $slug}}) {
      edges {
        node {
          titreHistoire
          slugHistoire
          role
        }
      }
    }
  }`