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
	Progress,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

class Events extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem active>Major events</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={"/evenements"}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Major events</h1>
						<p className="lead">Here are all the major events that have occurred in the New Human Universe.</p>
						<p className="lead">Watch out for spoilers!</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col lg="12" >
							<VerticalTimeline>
								{
									data.allContentfulEvenements.edges.map(
										(edge) =>
											<VerticalTimelineElement
												className="vertical-timeline-element--work"
												date={edge.node.dateSpe + " / " + edge.node.date}
												key={edge.node.id}
											>
												<h3 className="vertical-timeline-element-title">{edge.node.titre}</h3>
												<div>
													<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													<Link to={'stories/' + edge.node.slugRoman}>{edge.node.nomRoman} - {edge.node.chapitres}</Link>
												</div>
											</VerticalTimelineElement>
									)
								}
							</VerticalTimeline>
						</Col>
						<Col sm="12" lg="3" >
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

Events.propTypes = {
	data: PropTypes.object.isRequired
}

export default Events

export const pageQuery = graphql`query evenementsQueryEN {
	allContentfulEvenements (sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "MM-DD")
				dateSpe
				nomRoman
				slugRoman
				chapitres
			}
		}
	}
}`