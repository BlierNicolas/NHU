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

class Pouvoir extends Component {
	render() {
		const {
			nomPouvoir,
			description,
			equivalentUrl
		} = this.props.data.contentfulPouvoir

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/pouvoirs">Abilités des personnages</Link></BreadcrumbItem>
						<BreadcrumbItem active>{nomPouvoir}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={"/en" + equivalentUrl}>En</Link></Button>
				</div> */}

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center">{nomPouvoir}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>

				<Footer />
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
		equivalentUrl
	}
}`