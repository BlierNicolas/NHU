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
	CardHeader,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';
import classnames from 'classnames';

class Nouvelle extends Component {
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
			titreNouvelle,
			description,
			date,
			slug,
			lienReference,
			node_locale
		} = this.props.data.contentfulNouvelle

		return (
			<div>
				<Breadcrumb className="mb-0">
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem><Link to="/nouvelles">Quoi de nouveau&nbsp;?</Link></BreadcrumbItem>
					<BreadcrumbItem active>{titreNouvelle}</BreadcrumbItem>
				</Breadcrumb>

				<Container className="py-5">
					<Row>
						<Col>
							<div className="mb-5">
								<h1 className="display-4">{titreNouvelle}</h1>
								<span><small>{date}</small></span>
							</div>

							<div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
							
							{
								lienReference ?
									(<Link to={lienReference}>Voir les détails</Link>) :
									('')
							}
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}

Nouvelle.propTypes = {
	data: PropTypes.object.isRequired
}

export default Nouvelle

export const pageQuery = graphql`query nouvelleQueryFR ($slug: String!) {
	contentfulNouvelle(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
		titreNouvelle
		description {
			childMarkdownRemark {
				html
			}
		}
		date(formatString: "YYYY MMMM DD HH:MM")
		slug
		lienReference
		node_locale
	}
}`