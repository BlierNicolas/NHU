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
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class Theory extends Component {
	render() {
		const {
			titre,
			texte,
			equivalentUrl
		} = this.props.data.contentfulTheorie

		return (
			<div id="page-wrapper">
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/en/encyclopedia">The universal encyclopedia</Link></BreadcrumbItem>
						<BreadcrumbItem active>{titre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center mb-5">{titre}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: texte.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

Theory.propTypes = {
	data: PropTypes.object.isRequired
}

export default Theory

export const pageQuery = graphql`query theorieQueryEN ($slug: String!) {
	contentfulTheorie(slug: {eq:$slug}, node_locale: {eq: "en-US"}) {
		titre
		texte {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
}`