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
	BreadcrumbItem
} from 'reactstrap';

// var marked = require('marked');

class Groupe extends Component {
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
		} = this.props;

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/groupes">Groupes, clans et organisations...</Link></BreadcrumbItem>
					<BreadcrumbItem active>{data.contentfulGroupe.nomGroupe}</BreadcrumbItem>
				</Breadcrumb>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center">{data.contentfulGroupe.nomGroupe}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: data.contentfulGroupe.description.childMarkdownRemark.html }} />
						</Col>

						<Col lg={{ size: 8, offset: 2 }} md="12">
							{
								data.allContentfulMembreGroupe ?
									(
										<ListGroup>
											{
												data.allContentfulMembreGroupe.edges.map(
													(edge) =>
														<ListGroupItem className="text-center">
															<Link to={'personnages/' + edge.node.sulgMembre}>{edge.node.nomMembre + " - " + edge.node.positionMembre + " ( " + edge.node.status + " )"}</Link>
														</ListGroupItem>)
											}
										</ListGroup>) :
									('')
							}
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

Groupe.propTypes = {
	data: PropTypes.object.isRequired
}

export default Groupe

export const pageQuery = graphql`query groupeQueryFR ($slug: String!, $nomGroupe: String!) {
	contentfulGroupe(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
		nomGroupe
		description {
			childMarkdownRemark {
				html
			}
		}
	}
	allContentfulMembreGroupe(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: "fr-CA"}, nomGroupe: {eq: $nomGroupe}}) {
		edges {
		  node {
			id
			nomMembreGroupe
			nomMembre
			slugMembre
			positionMembre
			status
			ordre
		  }
		}
	  }
}`