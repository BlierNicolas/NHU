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
// import BackToTop from '../components/back_to_top';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Evenements extends Component {
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
					<Helmet title={this.lang.header_evenements + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={2} active={this.lang.header_evenements} />

					<EquivURL url={this.lang.equi_evenements + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_evenements} first={this.lang.evenements_intro_text} second={this.lang.encyclopedie_intro_warning} />

					<Container fluid className="py-5">
						<Row>
							<Col lg="12" >
								<VerticalTimeline>
									{
										data.allContentfulEvenements.edges.map(
											(edge) =>
												<VerticalTimelineElement
													className="vertical-timeline-element--work"
													date={edge.node.dateSpe + " / " + edge.node.date}
													key={edge.node.id}
												>
													<h3 className="vertical-timeline-element-title">{edge.node.titre}</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
														<Link to={this.lang.list_histoires_url + edge.node.slugRoman + "/"}>{edge.node.nomRoman} - {edge.node.chapitres}</Link>
													</div>
												</VerticalTimelineElement>
										)
									}
								</VerticalTimeline>
							</Col>
						</Row>
					</Container>

					{/* <Container fluid>
						<div className="pb-5">
							<BackToTop lang={this.props.pageContext.lang} />
						</div>
					</Container> */}

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Evenements.propTypes = {
	data: PropTypes.object.isRequired
}

export default Evenements

export const pageQuery = graphql`query evenementsQueryFR ($lang: String!) {
	allContentfulEvenements (sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "MM-DD")
				dateSpe
				nomRoman
				slugRoman
				chapitres
			}
		}
	}
}`