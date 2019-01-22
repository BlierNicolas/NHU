import React, { Component } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import BlockCalendrier from '../components/block_calendrier';
import BlockIntro from '../components/block_intro';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import BackToTop from '../components/back_to_top';
import EquivURL from '../components/equivURL';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Calendrier extends Component {
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
					<Helmet title={this.lang.header_calendrier + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={2} active={this.lang.header_calendrier} />

					<EquivURL url={this.lang.equi_calendrier + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_calendrier} first={this.lang.calendrier_intro_text} />

					<Container fluid className="p-0">
						<Row className="pb-5">
							<Col sm="12" lg="9" >
								<BlockCalendrier allCalendrier={data.allContentfulCalendrier} lang={this.props.pageContext.lang} />
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

Calendrier.propTypes = {
	data: PropTypes.object.isRequired
}

export default Calendrier

export const pageQuery = graphql`query calendrierQueryFR ($lang: String!) {
	allContentfulCalendrier (sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
				romanSlug
				affiche
			}
		}
	}
  }`