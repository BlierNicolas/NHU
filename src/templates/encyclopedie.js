import React, { Component } from 'react';
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
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class ListeDesTheories extends Component {
	constructor(props) {
		super(props);

		this.lang = lang_fr;

		if (this.props.pathContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pathContext.lang == "en-US") {
			this.lang = lang_en;
		}
	}
	
	render() {
		const {
			data
		} = this.props

		return (
			<div id="page-wrapper">
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{this.lang.header_encyclopedie}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_encyclopedie + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_encyclopedie}</h1>
						<p className="lead">{this.lang.encyclopedie_intro_text}</p>
						<p className="lead">{this.lang.encyclopedie_intro_warning}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulTheorie.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2 anim-bounce-in" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={this.lang.encyclopedie_url + edge.node.slug + "/"}><h2><small>{edge.node.titre}</small></h2></Link>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div className="card-text" dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={this.lang.encyclopedie_url + edge.node.slug + "/"}>{this.lang.nouvelle_details}</Link>
													</Col>
												</Row>
											</div>
										</div>
								)
							}
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

ListeDesTheories.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesTheories

export const pageQuery = graphql`query listeTheorieQueryFR ($lang: String!) {
	allContentfulTheorie (sort: {fields: [titre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				texte {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`