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
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Groupe extends Component {
	constructor(props) {
		super(props);

		this.lang = lang_fr;

		if (this.props.pathContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pathContext.lang == "en-US") {
			this.lang = lang_en;
		}
	}

	render() {
		const {
			data
		} = this.props;

		return (
			<div id="page-wrapper">
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={this.lang.header_groupes_url + "/"}>{this.lang.header_groupes}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulGroupe.nomGroupe}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + data.contentfulGroupe.equivalentUrl + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

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
														edge.node.nomGroupe == data.contentfulGroupe.nomGroupe ?
															(
																<ListGroupItem className="text-center">
																	<Link to={this.lang.personnages_url + edge.node.slugMembre + "/"}>{edge.node.nomMembre + " - " + edge.node.positionMembre + " ( " + edge.node.status + " )"}</Link>
																</ListGroupItem>) :
															(''))
											}
										</ListGroup>) :
									('')
							}
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

Groupe.propTypes = {
	data: PropTypes.object.isRequired
}

export default Groupe

export const pageQuery = graphql`query groupeQueryFR ($slug: String!, $lang: String!) {
	contentfulGroupe(slug: {eq:$slug}, node_locale: {eq: $lang}) {
		nomGroupe
		description {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
	allContentfulMembreGroupe(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
		  node {
			id
			nomMembreGroupe
			nomMembre
			nomGroupe
			slugMembre
			positionMembre
			status
			ordre
		  }
		}
	  }
}`