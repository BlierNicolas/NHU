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
	CardDeck,
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

class ListeDesTheories extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem active>L'encyclopédie universelle</BreadcrumbItem>
				</Breadcrumb>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">L'encyclopédie universelle</h1>
						<p className="lead">Voici toutes les théories au sujet de l'Univers des Nouveaux Humains.</p>
						<p className="lead">Attention au spoil!</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row>
						{
							data.allContentfulTheorie.edges.map(
								(edge) =>
									<Col lg="4" md="6" sm="12" key={edge.node.id}>
										<Card>
											<CardHeader><Link to={'encyclopedie/' + edge.node.slug}><h2><small>{edge.node.titre}</small></h2></Link></CardHeader>
											<CardBody>
												<div className="card-text" dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
												<Link className="float-right mb-2" to={'encyclopedie/' + edge.node.slug}>Voir les détails</Link>
											</CardBody>
										</Card>
									</Col>
							)
						}
					</Row>
				</Container>
			</div>
		)
	}
}

ListeDesTheories.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesTheories

export const pageQuery = graphql`query listeTheorieQueryFR {
	allContentfulTheorie (filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				texte {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`