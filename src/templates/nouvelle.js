import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
	Breadcrumb,
	BreadcrumbItem
} from 'reactstrap';

class Nouvelle extends Component {
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