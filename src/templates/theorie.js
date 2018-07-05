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
import Header from '../components/Header'
import Footer from '../components/Footer'

class Theorie extends Component {
	render() {
		const {
			titre,
			texte,
			equivalentUrl
		} = this.props.data.contentfulTheorie

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/encyclopedie">L'encyclopédie universelle</Link></BreadcrumbItem>
						<BreadcrumbItem active>{titre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={"/en" + equivalentUrl}>En</Link></Button>
				</div>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center mb-5">{titre}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

Theorie.propTypes = {
	data: PropTypes.object.isRequired
}

export default Theorie

export const pageQuery = graphql`query theorieQueryFR ($slug: String!) {
	contentfulTheorie(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
		titre
		texte {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
}`