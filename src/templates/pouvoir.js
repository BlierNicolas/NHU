import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col
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

class Pouvoir extends Component {
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
			nomPouvoir,
			description,
			equivalentUrl
		} = this.props.data.contentfulPouvoir

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={nomPouvoir + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_pouvoirs_url} un={this.lang.header_pouvoirs} active={nomPouvoir} />

					<EquivURL url={this.lang.other_lang_url + equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container fluid className="py-5">
						<Row className="pb-5">
							<Col lg={{ size: 8, offset: 2 }} md="12">
								<h1 className="display-4 page-header text-center display-title">{nomPouvoir}</h1>
								<div className="text-justify" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
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