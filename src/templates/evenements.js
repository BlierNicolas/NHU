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
	BreadcrumbItem,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Evenements extends Component {
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
					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{this.lang.header_evenements}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<div className="equiv">
						<Link className="text-white" to={this.lang.equi_evenements + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
					</div>

					<div className="py-5">
						<Container fluid>
							<h1 className="display-4">{this.lang.header_evenements}</h1>
							<p className="lead">{this.lang.evenements_intro_text}</p>
							<p className="lead">{this.lang.encyclopedie_intro_warning}</p>
						</Container>
					</div>

					<Container fluid className="p-0">
						<Row className="pb-5">
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