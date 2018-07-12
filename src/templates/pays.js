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

class Pays extends Component {
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
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/giervia">Giervia</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulPays.nomPays}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={"/en/giervia" + data.contentfulPays.equivalentUrl}><Button className="float-right" color="primary">En</Button></Link>
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
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
								Histoire
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Villes
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
								Démographie
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
								Géographie
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '5' })} onClick={() => { this.toggle('5'); }}>
								Politique
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink className={classnames({ active: this.state.activeTab === '6' })} onClick={() => { this.toggle('6'); }}>
								Sociologie
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
												<h3>Histoire</h3>
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
										<th>Nom de la ville</th>
										<th>Superficie</th>
										<th>Population</th>
										<th>Quantité de Nouveaux Humains</th>
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
									Superficie: {data.contentfulPays.superficie} m<sup>2</sup><br />
									Population: {data.contentfulPays.population}<br />
									Quantité de Nouveaux Humains: {data.contentfulPays.quantiteNouvHumains}
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
													<h3>Climat</h3>
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
													<h3>Ressources</h3>
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
													<h3>Type de terrain</h3>
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
													<h3>Dirigeants</h3>
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
													<h3>Réputation</h3>
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
													<h3>Conflit</h3>
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
													<h3>Langues et cultures</h3>
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

Pays.propTypes = {
	data: PropTypes.object.isRequired
}

export default Pays

export const pageQuery = graphql`query paysQueryFR ($slug: String!) {
	contentfulPays(slug: {eq:$slug}, node_locale: {eq: "fr-CA"}) {
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
	allContentfulVille(sort: {fields: [nomVille], order: ASC}, filter: {node_locale: {eq: "fr-CA"}, slugPaysParent: {eq: $slug}}) {
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