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

class ListOfTheories extends Component {
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
						<BreadcrumbItem active>The universal encyclopedia</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/encyclopedie">Fr</Link></Button>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">The universal encyclopedia</h1>
						<p className="lead">Here are all the theories about the New Human Universe.</p>
						<p className="lead">Watch out for spoilers!</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulTheorie.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={'/en/encyclopedia/' + edge.node.slug}><h2><small>{edge.node.titre}</small></h2></Link>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div className="card-text" dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={'/en/encyclopedia/' + edge.node.slug}>See details</Link>
													</Col>
												</Row>
											</div>
										</div>
								)
							}
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

ListOfTheories.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListOfTheories

export const pageQuery = graphql`query listeTheorieQueryEN {
	allContentfulTheorie (filter: {node_locale: {eq: "en-US"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				texte {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`