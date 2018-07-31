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
import Block_News from '../components/block_news.en';

class ListOfNews extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<div id="page-wrapper">
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem active>What's new&nbsp;?</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/nouvelles"><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">What's new&nbsp;?</h1>
						<p className="lead">Here is a small informational page about the Universe itself.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							<Block_News allNouvelles={data.allContentfulNouvelle} />
						</Col>
						<Col sm="12" lg="3" >
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

ListOfNews.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListOfNews

export const pageQuery = graphql`query listeNouvelleQueryEN2 {
	allContentfulNouvelle (sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				id
				titreNouvelle
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
				dateSpe
				slug
			}
		}
	}
  }`