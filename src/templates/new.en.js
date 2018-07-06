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

class Neww extends Component {
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
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/en/news">What's new&nbsp;?</Link></BreadcrumbItem>
						<BreadcrumbItem active>{titreNouvelle}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to={equivalentUrl}>Fr</Link></Button>
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
									(<Link to={lienReference}>See details</Link>) :
									('')
							}
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

Neww.propTypes = {
	data: PropTypes.object.isRequired
}

export default Neww

export const pageQuery = graphql`query nouvelleQueryEN ($slug: String!) {
	contentfulNouvelle(slug: {eq:$slug}, node_locale: {eq: "en-US"}) {
		titreNouvelle
		description {
			childMarkdownRemark {
				html
			}
		}
		date(formatString: "YYYY-MM-DD")
		dateSpe
		slug
		lienReference
		node_locale
		equivalentUrl
	}
}`