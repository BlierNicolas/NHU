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

class Nouvelle extends Component {
	render() {
		const {
			titreNouvelle,
			description,
			date,
			dateSpe,
			slug,
			lienReference,
			node_locale,
			equivalentUrl
		} = this.props.data.contentfulNouvelle

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/nouvelles">Quoi de nouveau&nbsp;?</Link></BreadcrumbItem>
						<BreadcrumbItem active>{titreNouvelle}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={"/en" + equivalentUrl}>En</Link></Button>
				</div> */}

				<Container className="py-5">
					<Row>
						<Col>
							<div className="mb-5">
								<h1 className="display-4">{titreNouvelle}</h1>
								<span><small>{dateSpe} / {date}</small></span>
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

				<Footer />
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
		date(formatString: "YYYY MMMM DD")
		dateSpe
		slug
		lienReference
		node_locale
		equivalentUrl
	}
}`