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

class ListOfPowers extends Component {
	constructor(props) {
		super(props);

		this.firstLetter = '';
	}

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
						<BreadcrumbItem active>Character abilities</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/pouvoirs"><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Character abilities</h1>
						<p className="lead">These are all the powers that are present in the New Human Universe.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPouvoir.edges.map(
								(edge) =>
								<React.Fragment>
									{
										this.firstLetter != edge.node.nomPouvoir.charAt(0) ?
											(
												<Col lg="12" className="text-center my-3">
													<hr />
													<h3>
														{this.firstLetter = edge.node.nomPouvoir.charAt(0)}
													</h3>
												</Col>
											) :
											('')
									}
									<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3">
										<Link to={'/en/powers/' + edge.node.slug}>{edge.node.nomPouvoir}</Link>
									</Col>
								</React.Fragment>
							)
						}
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

ListOfPowers.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListOfPowers

export const pageQuery = graphql`query listePouvoirQueryEN {
    allContentfulPouvoir(sort: {fields: [nomPouvoir], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
        edges {
            node {
				id
                nomPouvoir
				slug
				description {
					childMarkdownRemark {
						html
					}
				}
            }
        }
    }
  }`