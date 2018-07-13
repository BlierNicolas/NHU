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

class Power extends Component {
	render() {
		const {
			nomPouvoir,
			description,
			equivalentUrl
		} = this.props.data.contentfulPouvoir

		return (
			<div id="page-wrapper">
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/en/powers">Character abilities</Link></BreadcrumbItem>
						<BreadcrumbItem active>{nomPouvoir}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<Container fluid className="py-5">
					<Row className="pb-5">
						<Col lg={{ size: 8, offset: 2 }} md="12">
							<h1 className="display-4 page-header text-center">{nomPouvoir}</h1>
							<div className="text-justify" dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

Power.propTypes = {
	data: PropTypes.object.isRequired
}

export default Power

export const pageQuery = graphql`query pouvoirQueryEN ($slug: String!) {
	contentfulPouvoir(slug: {eq:$slug}, node_locale: {eq: "en-US"}) {
		nomPouvoir
		description {
			childMarkdownRemark {
				html
			}
		}
		equivalentUrl
	}
}`