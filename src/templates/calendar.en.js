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
import Block_Calendar from '../components/block_calendar.en';

class Calendar extends Component {
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
						<BreadcrumbItem active>Calendar of releases</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/calendrier"><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Calendar of releases</h1>
						<p className="lead">Here you will find the release dates of the next chapters about the New Human Universe.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
                            <Block_Calendar allCalendrier={data.allContentfulCalendrier} />
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

Calendar.propTypes = {
	data: PropTypes.object.isRequired
}

export default Calendar

export const pageQuery = graphql`query calendrierQueryEN {
	allContentfulCalendrier (sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
				romanSlug
				affiche
			}
		}
	}
  }`