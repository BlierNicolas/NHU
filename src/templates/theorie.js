import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
	Row,
	Col,
	Jumbotron,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';

// var marked = require('marked');

class Theorie extends Component {
	render() {
		const {
			titre,
			texte
		} = this.props.data.contentfulTheorie

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/encyclopedie">L'encyclopédie universelle</Link></BreadcrumbItem>
					<BreadcrumbItem active>{titre}</BreadcrumbItem>
				</Breadcrumb>

				<Container fluid className="py-5">
					<Row>
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center mb-5">{titre}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>
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
	}
}`