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
import BlockIntro from '../components/block_intro';
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import BackToTop from '../components/back_to_top';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class ListeDesPersonnages extends Component {
	constructor(props) {
		super(props);

		this.firstLetter = '';

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
					<Helmet title={this.lang.header_personnages + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={2} active={this.lang.header_personnages} />

					<EquivURL url={this.lang.equi_personnages + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_personnages} first={this.lang.personnages_intro_text} />

					<Container fluid className="py-5">
						<Row>
							{
								data.allContentfulPersonnage.edges.map(
									(edge) =>
										<React.Fragment key={edge.node.id}>
											{
												this.firstLetter !== edge.node.nomComplet.charAt(0) ?
													(
														<Col lg="12" className="text-center my-3 anim-bounce-in">
															<hr />
															<h3>{this.firstLetter = edge.node.nomComplet.charAt(0)}</h3>
														</Col>
													) :
													('')
											}
											<Col lg="3" md="4" sm="6" className="text-center my-3 anim-bounce-in">
												<Link to={this.lang.personnages_url + edge.node.slug + "/"}>{edge.node.nomComplet}</Link>
											</Col>
										</React.Fragment>
								)
							}
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

ListeDesPersonnages.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPersonnages

export const pageQuery = graphql`query listePersonnageQueryFR ($lang: String!) {
    allContentfulPersonnage(sort: {fields: [nomComplet], order: ASC}, filter: {node_locale: {eq: $lang}}) {
        edges {
            node {
				id
                nomComplet
                alignement
                slug
            }
        }
    }
  }`