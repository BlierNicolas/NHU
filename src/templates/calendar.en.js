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
							{
								data.allContentfulCalendrier.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											{edge.node.affiche ?
												(<div>
													<div className="">
														<Row className="no-gutters">
															<Col md="9" sm="12">
																<h3 className="float-left"><small>{edge.node.titre}</small></h3>
															</Col>

															<Col md="3" sm="12">
																<span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
															</Col>
														</Row>
													</div>
													<div>
														<Row className="no-gutters">
															<Col md="9" sm="12">
																<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
															</Col>

															<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
																{
																	edge.node.romanSlug ?
																		(<Link className="float-right mb-2" to={"/en" + edge.node.romanSlug}>Go see the story</Link>) :
																		('')
																}
															</Col>
														</Row>
													</div>
												</div>) :
												('')
											}
										</div>
								)
							}
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