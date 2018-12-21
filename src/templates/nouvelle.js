import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
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
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Nouvelle extends Component {
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
			titreNouvelle,
			description,
			date,
			dateSpe,
			lienReference,
			equivalentUrl
		} = this.props.data.contentfulNouvelle

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={titreNouvelle + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_nouvelles_url} un={this.lang.header_nouvelles} active={titreNouvelle} />

					<EquivURL url={this.lang.other_lang_url + equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container className="py-5">
						<Row>
							<Col>
								<div className="mb-5">
									<h1 className="display-4 display-title">{titreNouvelle}</h1>
									<span><small>{dateSpe} / {date}</small></span>
								</div>

								<div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />

								{
									lienReference ?
										(<Link to={lienReference + "/"}>{this.lang.nouvelle_details}</Link>) :
										('')
								}
							</Col>
						</Row>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Nouvelle.propTypes = {
	data: PropTypes.object.isRequired
}

export default Nouvelle

export const pageQuery = graphql`query nouvelleQueryFR ($slug: String!, $lang: String!) {
	contentfulNouvelle(slug: {eq:$slug}, node_locale: {eq: $lang}) {
		titreNouvelle
		description {
			childMarkdownRemark {
				html
			}
		}
		date(formatString: "YYYY-MM-DD")
		dateSpe
		slug
		lienReference
		node_locale
		equivalentUrl
	}
}`