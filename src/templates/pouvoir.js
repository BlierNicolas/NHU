import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import EquivURL from '../components/equivURL';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Pouvoir extends Component {
	constructor(props) {
		super(props);

		this.lang = lang_fr;

		if (this.props.pageContext.lang === "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pageContext.lang === "en-US") {
			this.lang = lang_en;
		}
	}

	render() {
		const {
			nomPouvoir,
			description,
			equivalentUrl
		} = this.props.data.contentfulPouvoir

		return (
			<Layout>
				<div id="page-wrapper">
					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem><Link to={this.lang.header_pouvoirs_url + "/"}>{this.lang.header_pouvoirs}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{nomPouvoir}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<EquivURL url={this.lang.other_lang_url + equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container fluid className="py-5">
						<Row className="pb-5">
							<Col lg={{ size: 8, offset: 2 }} md="12">
								<h1 className="display-4 page-header text-center">{nomPouvoir}</h1>
								<div className="text-justify" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
							</Col>
						</Row>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Pouvoir.propTypes = {
	data: PropTypes.object.isRequired
}

export default Pouvoir

export const pageQuery = graphql`query pouvoirQueryFR ($slug: String!, $lang: String!) {
	contentfulPouvoir(slug: {eq:$slug}, node_locale: {eq: $lang}) {
		nomPouvoir
		description {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
}`