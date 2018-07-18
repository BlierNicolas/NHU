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
	Button,
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	ListGroup,
	Table
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';

class Country extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

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
						<BreadcrumbItem><Link to="/en/giervia">Giervia</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulPays.nomPays}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={"/giervia" + data.contentfulPays.equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<Container className="pb-5">
					<Row>
						<Col lg="12" md="12">
							<div className="mt-5 mb-3">
								<div>
									<h1 className="display-4">{data.contentfulPays.nomPays} - <small className="font-weight-300">{data.contentfulPays.nomContinent}</small></h1>
									{
										data.contentfulPays.description ?
											(<div className="my-3">
												<div>
													<h3>Description</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.description.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
								</div>
							</div>
						</Col>
					</Row>

					<Nav pills>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
								History
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Cities
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
								Demography
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
								Geography
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '5' })} onClick={() => { this.toggle('5'); }}>
								Politics
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '6' })} onClick={() => { this.toggle('6'); }}>
								Sociology
							</NavLink>
						</NavItem>
					</Nav>
					<br />
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ListGroup>
								{
									data.contentfulPays.histoire ?
										(<div className="my-3">
											<div>
												<h3>History</h3>
												<div>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.histoire.childMarkdownRemark.html }} />
												</div>
											</div>
										</div>) :
										('')
								}
							</ListGroup>
						</TabPane>
						<TabPane tabId="2">
							<Table>
								<thead>
									<tr>
										<th>City name</th>
										<th>Area</th>
										<th>Population</th>
										<th>Amount of New Humans</th>
									</tr>
								</thead>
								<tbody>
									{
										data.allContentfulVille.edges.map(
											(edge) => <tr key={edge.node.id}>
												<td><Link to={'/giervia/abaltia/' + edge.node.slug}>{edge.node.nomVille}</Link></td>
												<td>{edge.node.superficie} m<sup>2</sup></td>
												<td>{edge.node.population}</td>
												<td>{edge.node.quantiteNouvHumains}</td>
											</tr>)
									}
								</tbody>
							</Table>
						</TabPane>
						<TabPane tabId="3">
							<ListGroup>
								<div>
									Area: {data.contentfulPays.superficie} m<sup>2</sup><br />
									Population: {data.contentfulPays.population}<br />
									Amount of New Humans: {data.contentfulPays.quantiteNouvHumains}
								</div>
							</ListGroup>
						</TabPane>
						<TabPane tabId="4">
							<ListGroup>
								<div>
									{
										data.contentfulPays.climat ?
											(<div className="my-3">
												<div>
													<h3>Temperature</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.climat.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulPays.ressources ?
											(<div className="my-3">
												<div>
													<h3>Resources</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.ressources.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulPays.typeTerrain ?
											(<div className="my-3">
												<div>
													<h3>Field type</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.typeTerrain.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{/* Carte: */}
								</div>
							</ListGroup>
						</TabPane>
						<TabPane tabId="5">
							<ListGroup>
								<div>
									{
										data.contentfulPays.dirigeants ?
											(<div className="my-3">
												<div>
													<h3>Leaders</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.dirigeants.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulPays.reputation ?
											(<div className="my-3">
												<div>
													<h3>Reputation</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.reputation.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulPays.conflit ?
											(<div className="my-3">
												<div>
													<h3>Conflict</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.conflit.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{/* Drapeau: */}
								</div>
							</ListGroup>
						</TabPane>
						<TabPane tabId="6">
							<ListGroup>
								<div>
									{
										data.contentfulPays.langueCulture ?
											(<div className="my-3">
												<div>
													<h3>Languages and cultures</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.langueCulture.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulPays.religion ?
											(<div className="my-3">
												<div>
													<h3>Religion</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.religion.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
								</div>
							</ListGroup>
						</TabPane>
					</TabContent>
				</Container>

				<Footer />
			</div>
		)
	}
}

Country.propTypes = {
	data: PropTypes.object.isRequired
}

export default Country

export const pageQuery = graphql`query paysQueryEN ($slug: String!) {
	contentfulPays(slug: {eq:$slug}, node_locale: {eq: "en-US"}) {
		nomPays
		slug
		equivalentUrl
		nomContinent
		description {
			childMarkdownRemark {
				html
			}
		}
		histoire {
			childMarkdownRemark {
				html
			}
		}
		superficie
		population
		quantiteNouvHumains
		climat {
			childMarkdownRemark {
				html
			}
		}
		ressources {
			childMarkdownRemark {
				html
			}
		}
		typeTerrain {
			childMarkdownRemark {
				html
			}
		}
		dirigeants {
			childMarkdownRemark {
				html
			}
		}
		reputation {
			childMarkdownRemark {
				html
			}
		}
		conflit {
			childMarkdownRemark {
				html
			}
		}
		langueCulture {
			childMarkdownRemark {
				html
			}
		}
		religion {
			childMarkdownRemark {
				html
			}
		}
	}
	allContentfulVille(sort: {fields: [nomVille], order: ASC}, filter: {node_locale: {eq: "en-US"}, slugPaysParent: {eq: $slug}}) {
		edges {
			node {
				id
				nomVille
				slug
				superficie
				population
				quantiteNouvHumains
			}
		}
	}
}`