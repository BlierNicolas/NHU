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
import classnames from 'classnames';

class Pouvoir extends Component {
    constructor(props) {
		super(props);
        this.state = { nightMode: false, status: 'inactif' };

        this.checkActif();
    }

	checkActif() {
		console.log(this.state.nightMode);
		if (this.state.nightMode) {
			document.body.classList.add('darkClass')
		} else {
			document.body.classList.remove('darkClass')
		}
		console.log("Night mode " + this.state.status);
	}

	render() {
		const {
			nomPouvoir,
			description
		} = this.props.data.contentfulPouvoir

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/pouvoirs">Abilités des personnages</Link></BreadcrumbItem>
					<BreadcrumbItem active>{nomPouvoir}</BreadcrumbItem>
				</Breadcrumb>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center">{nomPouvoir}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

Pouvoir.propTypes = {
	data: PropTypes.object.isRequired
}

export default Pouvoir

export const pageQuery = graphql`query pouvoirQueryFR ($slug: String!) {
	contentfulPouvoir(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
		nomPouvoir
		description {
			childMarkdownRemark {
				html
			}
		}
	}
}`