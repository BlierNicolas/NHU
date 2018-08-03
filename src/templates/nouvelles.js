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
import Block_Nouvelles from '../components/block_nouvelles';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class ListeDesNouvelles extends Component {
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
						<BreadcrumbItem active>{this.lang.header_nouvelles}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_nouvelles}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_nouvelles}</h1>
						<p className="lead">{this.lang.nouvelles_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							<Block_Nouvelles allNouvelles={data.allContentfulNouvelle} lang={this.props.pathContext.lang} />
						</Col>
						<Col sm="12" lg="3" >
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
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