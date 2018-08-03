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
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Pays extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};

		this.lang = lang_fr;

		if (this.props.pathContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pathContext.lang == "en-US") {
			this.lang = lang_en;
		}
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
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={this.lang.header_giervia_url}>{this.lang.header_giervia}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulPays.nomPays}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_pays + data.contentfulPays.equivalentUrl}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
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
													<h3>{this.lang.pays_description}</h3>
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
								{this.lang.pays_histoire}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								{this.lang.pays_villes}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
								{this.lang.pays_demographie}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
								{this.lang.pays_geographie}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '5' })} onClick={() => { this.toggle('5'); }}>
								{this.lang.pays_politique}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '6' })} onClick={() => { this.toggle('6'); }}>
								{this.lang.pays_sociologie}
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
												<h3>{this.lang.pays_histoire}</h3>
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
										<th>{this.lang.pays_nom_ville}</th>
										<th>{this.lang.pays_superficie}</th>
										<th>{this.lang.pays_population}</th>
										<th>{this.lang.pays_nouv_humains}</th>
									</tr>
								</thead>
								<tbody>
									{
										data.allContentfulVille.edges.map(
											(edge) => <tr key={edge.node.id}>
												<td><Link to={this.lang.monde_url + data.contentfulPays.nomPays + '/' + edge.node.slug}>{edge.node.nomVille}</Link></td>
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
									{this.lang.ville_superficie + data.contentfulPays.superficie} m<sup>2</sup><br />
									{this.lang.ville_population + data.contentfulPays.population}<br />
									{this.lang.ville_nouv_humains + data.contentfulPays.quantiteNouvHumains}
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
													<h3>{this.lang.pays_climat}</h3>
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
													<h3>{this.lang.pays_ressources}</h3>
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
													<h3>{this.lang.pays_terrain}</h3>
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
													<h3>{this.lang.pays_dirigeant}</h3>
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
													<h3>{this.lang.pays_reputation}</h3>
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
													<h3>{this.lang.pays_conflit}</h3>
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
													<h3>{this.lang.pays_culture}</h3>
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
													<h3>{this.lang.pays_religion}</h3>
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

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

Pays.propTypes = {
	data: PropTypes.object.isRequired
}

export default Pays

export const pageQuery = graphql`query paysQueryFR ($slug: String!, $lang: String!) {
	contentfulPays(slug: {eq:$slug}, node_locale: {eq: $lang}) {
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
	allContentfulVille(sort: {fields: [nomVille], order: ASC}, filter: {node_locale: {eq: $lang}, slugPaysParent: {eq: $slug}}) {
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