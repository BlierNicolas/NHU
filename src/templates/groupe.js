import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Breadcrumb,
	BreadcrumbItem,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'

class Groupe extends Component {
	render() {
		const {
			data
		} = this.props;

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/groupes">Groupes, clans et organisations...</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulGroupe.nomGroupe}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={"/en" + data.contentfulGroupe.equivalentUrl}>En</Link></Button>
				</div> */}

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
															<Link to={'/personnages/' + edge.node.slugMembre}>{edge.node.nomMembre + " - " + edge.node.positionMembre + " ( " + edge.node.status + " )"}</Link>
														</ListGroupItem>)
											}
										</ListGroup>) :
									('')
							}
						</Col>
					</Row>
				</Container>

				<Footer />
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
		equivalentUrl
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