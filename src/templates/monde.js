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
	Button,
	Collapse,
	Card,
	CardBody
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';
import Block_Pays_List from '../components/block_pays_list';

import Layout from '../components/layout'

class Monde extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };

		this.lang = lang_fr;

		if (this.props.pageContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pageContext.lang == "en-US") {
			this.lang = lang_en;
		}
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
					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{data.contentfulMonde.nomPlanete}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<div className="equiv">
						<Link className="text-white" to={this.lang.other_lang_url + data.contentfulMonde.equivalentUrl + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
					</div>

					<div className="py-5">
						<Container fluid>
							<h1 className="display-4">{this.lang.header_giervia}</h1>
							<p className="lead">{this.lang.monde_intro_text}</p>
						</Container>
					</div>

					<Container fluid className="mb-5">
						<div className="d-flex justify-content-center">
							<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.lang.monde_carte}</Button>
						</div>
						<Collapse isOpen={this.state.collapse}>
							<Card>
								<CardBody>
									<div className="d-flex justify-content-center">
										<img className="img-fluid" src={data.contentfulMonde.carte.file.url} />
									</div>
								</CardBody>
							</Card>
						</Collapse>
					</Container>

					<Container fluid className="p-0">
						<Row className="pb-5">
							<Block_Pays_List allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Fontil" />
							<Block_Pays_List allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Vactil" />
							<Block_Pays_List allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent="Xentil" />
							<Block_Pays_List allPays={data.allContentfulPays} lang={this.props.pageContext.lang} continent={this.lang.monde_iles} />
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