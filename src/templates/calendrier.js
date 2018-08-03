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
import Block_Calendrier from '../components/block_calendrier';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Calendrier extends Component {
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
						<BreadcrumbItem active>{this.lang.header_calendrier}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_calendrier}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_calendrier}</h1>
						<p className="lead">{this.lang.calendrier_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							<Block_Calendrier allCalendrier={data.allContentfulCalendrier} lang={this.props.pathContext.lang} />
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