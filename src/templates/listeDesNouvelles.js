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
	CardHeader,
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

class ListeDesNouvelles extends Component {
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
								<BreadcrumbItem><a href="../">Page d'accueil</a></BreadcrumbItem>
								<BreadcrumbItem active>Liste des histoires</BreadcrumbItem>
							</Breadcrumb>
						</div>
						<Card>
							<CardBody>
								<CardText>
									<h1 className="page-header text-center">Liste des nouvelles</h1>
									<div className="text-justify"><p>Voici toutes les nouvelles par rapport au site et aux informations au sujet de l'Univers des Nouveaux Humains.</p></div>
								</CardText>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col lg={{size: 8, offset:2}}>
						<Row>
								{
										data.allContentfulNouvelle.edges.map(
												(edge) => 
														<Col lg="4" md="6" sm="12">
																<Card>
																		<CardHeader>{edge.node.titreNouvelle}</CardHeader>
																		<CardBody>
																				<p className="text-right">{edge.node.date}</p>
																				<CardText>
																						<div dangerouslySetInnerHTML={{__html: edge.node.description.childMarkdownRemark.html}}/>
																						<Link to={'../nouvelle/'+edge.node.slug}>Voir les détails</Link>
																				</CardText>
																		</CardBody>
																</Card>
																<br />
														</Col>
										)
								}
						</Row>
					</Col>
				</Row>
            </Container>
		)
	}
}

ListeDesNouvelles.propTypes = { 
	data: PropTypes.object.isRequired
}

export default ListeDesNouvelles

export const pageQuery = graphql`query listeNouvelleQuer2 {
	allContentfulNouvelle(filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				titreNouvelle
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY MMMM DD HH:MM")
				slug
			}
		}
	}
  }`