import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
	ListGroup,
	ListGroupItem
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import BackToTop from '../components/back_to_top';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Groupe extends Component {
	constructor(props) {
		super(props);

		/** Buffer de la langue par défaut */
		this.lang = lang_fr;

		/** Trouve la bonne langue */
		if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
		if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }
	}

	render() {
		const {
			data
		} = this.props;

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={data.contentfulGroupe.nomGroupe + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_groupes_url} un={this.lang.header_groupes} active={data.contentfulGroupe.nomGroupe} lang={this.props.pageContext.lang} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulGroupe.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container fluid className="py-5">
						<Row className="pb-5">
							<Col lg={{ size: 8, offset: 2 }} md="12">
								<h1 className="display-4 page-header text-center display-title">{data.contentfulGroupe.nomGroupe}</h1>
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
															edge.node.nomGroupe === data.contentfulGroupe.nomGroupe ?
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

					<Container fluid>
						<div className="pb-5">
							<BackToTop lang={this.props.pageContext.lang} />
						</div>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
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