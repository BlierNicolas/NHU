import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Button,
	Collapse,
	Card,
	CardBody
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import BlockPaysList from '../components/block_pays_list';
import BlockIntro from '../components/block_intro';
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Monde extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };

		/** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

	render() {
		const {
			data
		} = this.props

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={data.contentfulMonde.nomPlanete + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={2} active={data.contentfulMonde.nomPlanete} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulMonde.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_giervia} first={this.lang.monde_intro_text} />

					<Container fluid className="mb-5">
						<div className="d-flex justify-content-center">
							<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.lang.monde_carte}</Button>
						</div>
						<Collapse isOpen={this.state.collapse}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center">
										<img className="img-fluid" src={data.contentfulMonde.carte.file.url} alt="Carte" />
									</div>
								</CardBody>
							</Card>
						</Collapse>
					</Container>

					<Container fluid className="p-0">
						<Row className="pb-5">
							<BlockPaysList allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Fontil" />
							<BlockPaysList allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Vactil" />
							<BlockPaysList allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Xentil" />
							<BlockPaysList allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent={this.lang.monde_iles} />
						</Row>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Monde.propTypes = {
	data: PropTypes.object.isRequired
}

export default Monde

export const pageQuery = graphql`query mondeQueryFR ($lang: String!) {
	contentfulMonde(slug: {eq:"giervia"}, node_locale: {eq: $lang}) {
		nomPlanete
		slug
		equivalentUrl
		carte {
		  file {
			url
		  }
		}
	}
	allContentfulPays(sort: {fields: [nomPays], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				nomPays
				slug
				nomContinent
			}
		}
	}
}`