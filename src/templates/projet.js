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

class Projet extends Component {
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
		} = this.props

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={data.contentfulProject.titre + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_projets_url} un={this.lang.header_projets} active={data.contentfulProject.titre} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulProject.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<div>
						<Container>
							<Row>
								<Col lg={{ size: 10, offset: 1 }} md="12">
									<h1 className="display-4 page-header text-center display-title">{data.contentfulProject.titre}</h1>
									<p>
										{this.lang.projet_categorie + data.contentfulProject.typeProjet}
									</p>
									<p> {this.lang.projet_status}
										{data.contentfulProject.terminer ?
											(this.lang.projet_terminer) :
											(this.lang.projet_en_cours)
										}
									</p>
									<div className="text-justify" dangerouslySetInnerHTML={{ __html: data.contentfulProject.description.childMarkdownRemark.html }} />
								</Col>
							</Row>
						</Container>
					</div>

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

Projet.propTypes = {
	data: PropTypes.object.isRequired
}

export default Projet

export const pageQuery = graphql`query projetQueryFR ($slug: String!, $lang: String!) {
	contentfulProject (slug: {eq:$slug}, node_locale: {eq: $lang}) {
		id
		titre
		description {
			childMarkdownRemark {
				html
			}
		}
		slug
		terminer
		equivalentUrl
		typeProjet
	}
  }`