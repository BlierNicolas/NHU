import React, {Component} from 'react';
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
	BreadcrumbItem
} from 'reactstrap';

class Personnage extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<Container fluid="true"> 
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<div>
							<Breadcrumb>
								<BreadcrumbItem><a href="../../">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem><a href="../../listedespersonnages">Liste des personnages</a></BreadcrumbItem>
								<BreadcrumbItem active>{data.contentfulPersonnage.nomComplet}</BreadcrumbItem>
							</Breadcrumb>
						</div>
					</Col>
				</Row>
				<Row>
					<Col lg={{size: 8, offset:2}}>
                        <Card>
                            <CardBody>
                                <CardTitle>{data.contentfulPersonnage.nomComplet}</CardTitle>
                                <CardText>
                                    Pouvoir: {data.contentfulPersonnage.pouvoirNom}<br/>
                                    Alignement: {data.contentfulPersonnage.alignement}<br/>
                                    Data de naissance: {data.contentfulPersonnage.dateNaissance}<br/>
                                    Âge: {data.contentfulPersonnage.age}</CardText>
                            </CardBody>
                        </Card>
                        <br />
                        {
                            data.contentfulPersonnage.descriptionSommaire ?
                                (<Card>
                                    <CardBody>
                                        <CardTitle>Description sommaire</CardTitle>
                                        <CardText>
                                        <div dangerouslySetInnerHTML={{__html: data.contentfulPersonnage.descriptionSommaire.childMarkdownRemark.html}} /></CardText>
                                    </CardBody>
                                </Card>) :
                                ('')
                        }
                        <br />
                        {
                            data.contentfulPersonnage.descriptionPouvoir ?
                                (<Card>
                                    <CardBody>
                                        <CardTitle>Description du pouvoir</CardTitle>
                                        <CardText>
                                        <div dangerouslySetInnerHTML={{__html: data.contentfulPersonnage.descriptionPouvoir.childMarkdownRemark.html}} /></CardText>
                                    </CardBody>
                                </Card>) :
                                ('')
                        }
                        <br />
                        {
                            data.contentfulPersonnage.descriptionPhysique ?
                                (<Card>
                                    <CardBody>
                                        <CardTitle>Description physique</CardTitle>
                                        <CardText>
                                        <div dangerouslySetInnerHTML={{__html: data.contentfulPersonnage.descriptionPhysique.childMarkdownRemark.html}} /></CardText>
                                    </CardBody>
                                </Card>) :
                                ('')
                        }
                        <br />
                        {
                            data.contentfulPersonnage.relation ?
                                (<Card>
                                    <CardBody>
                                        <CardTitle>Relations</CardTitle>
                                        <CardText>
                                            <div dangerouslySetInnerHTML={{__html: data.contentfulPersonnage.relation.childMarkdownRemark.html}} />
                                        </CardText>
                                    </CardBody>
                                </Card>) :
                                ('')
                        }
                        <br />
                        {
                            data.allContentfulApparition ?
                                (<Card>
                                    <CardBody>
                                        <CardTitle>Apparitions</CardTitle>
                                        <CardText>
                                            <ListGroup>
                                                {
                                                    data.allContentfulApparition.edges.map(
                                                    (edge) => 
                                                        <ListGroupItem>
                                                            <Link to={'../../roman/'+edge.node.slugHistoire}>{edge.node.titreHistoire}</Link> - {edge.node.role}
                                                        </ListGroupItem>
                                                    )
                                                }
                                            </ListGroup>
                                        </CardText>
                                    </CardBody>
                                </Card>) :
                                ('')
                        }
					</Col>
				</Row>
			</Container>
		)
	}
}

Personnage.propTypes = { 
	data: PropTypes.object.isRequired
}

export default Personnage

export const pageQuery = graphql`query personnageQuery($slug: String!) {
    contentfulPersonnage(slug: {eq: $slug}) {
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
      typeGene
      slug
    }
    allContentfulApparition(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "en-US"}, personnageSlug: {eq: $slug}}) {
      edges {
        node {
          titreHistoire
          slugHistoire
          role
        }
      }
    }
  }`