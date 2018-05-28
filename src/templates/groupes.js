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
import classnames from 'classnames';

class ListeDesGroupes extends Component {
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
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem active>Groupes, clans et organisations...</BreadcrumbItem>
				</Breadcrumb>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Groupes, clans et organisations...</h1>
						<p className="lead">Voici tous les groupes faisant parti de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulGroupe.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={'groupes/' + edge.node.slug}><h2><small>{edge.node.nomGroupe}</small></h2></Link>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={'groupes/' + edge.node.slug}>Voir les détails</Link>
													</Col>
												</Row>
											</div>
										</div>
								)
							}
						</Col>
						<Col sm="12" lg="3" >
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

ListeDesGroupes.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesGroupes

export const pageQuery = graphql`query listeGroupeQueryFR {
	allContentfulGroupe (filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				nomGroupe
				description {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`