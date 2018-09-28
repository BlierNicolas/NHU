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
import BlockNouvelles from '../components/block_nouvelles';
import BlockIntro from '../components/block_intro';
import EquivURL from '../components/equivURL';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class ListeDesNouvelles extends Component {
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
			data
		} = this.props

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={this.lang.header_nouvelles + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{this.lang.header_nouvelles}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<EquivURL url={this.lang.equi_nouvelles + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_nouvelles} first={this.lang.nouvelles_intro_text} />

					<Container fluid className="p-0">
						<Row className="pb-5">
							<Col sm="12" lg="9" >
								<BlockNouvelles allNouvelles={data.allContentfulNouvelle} lang={this.props.pageContext.lang} />
							</Col>
							<Col sm="12" lg="3" >
							</Col>
						</Row>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

ListeDesNouvelles.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesNouvelles

export const pageQuery = graphql`query listeNouvelleQueryFR2 ($lang: String!) {
	allContentfulNouvelle (sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titreNouvelle
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
				dateSpe
				slug
			}
		}
	}
  }`