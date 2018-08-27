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

class Projet extends Component {
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
						<BreadcrumbItem><Link to={this.lang.header_projets_url + "/"}>{this.lang.header_projets}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulProject.titre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + data.contentfulProject.equivalentUrl + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div>
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<h1 className="display-4 page-header text-center">{data.contentfulProject.titre}</h1>
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

				<Footer lang={this.props.pathContext.lang} />
			</div>
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