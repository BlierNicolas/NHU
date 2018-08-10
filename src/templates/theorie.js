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

class Theorie extends Component {
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
			titre,
			texte,
			equivalentUrl
		} = this.props.data.contentfulTheorie

		return (
			<div id="page-wrapper">
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={this.lang.header_encyclopedie_url + "/"}>{this.lang.header_encyclopedie}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{titre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + equivalentUrl + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center mb-5">{titre}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

Theorie.propTypes = {
	data: PropTypes.object.isRequired
}

export default Theorie

export const pageQuery = graphql`query theorieQueryFR ($slug: String!, $lang: String!) {
	contentfulTheorie(slug: {eq:$slug}, node_locale: {eq: $lang}) {
		titre
		texte {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
}`