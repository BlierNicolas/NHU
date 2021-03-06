import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col,
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
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import BackToTop from '../components/back_to_top';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Pays extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};

		/** Buffer de la langue par défaut */
		this.lang = lang_fr;

		/** Trouve la bonne langue */
		if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
		if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }
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
			<Layout>
				<div id="page-wrapper">
					<Helmet title={data.contentfulPays.nomPays + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_giervia_url} un={this.lang.header_giervia} active={data.contentfulPays.nomPays} lang={this.props.pageContext.lang} />

					<EquivURL url={this.lang.equi_pays + data.contentfulPays.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container className="pb-5">
						<Row>
							<Col lg="12" md="12">
								<div className="mt-5 mb-3">
									<div>
										<h1 className="display-4 display-title">{data.contentfulPays.nomPays} - <small className="font-weight-300">{data.contentfulPays.nomContinent}</small></h1>
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
											data.allContentfulVille ? (
												data.allContentfulVille.edges.map(
													(edge) => <tr key={edge.node.id}>
														<td><Link to={this.lang.monde_url + edge.node.slugPaysParent + '/' + edge.node.slug + "/"}>{edge.node.nomVille}</Link></td>
														<td>{edge.node.superficie > 0 ?
															(<span>{edge.node.superficie} m<sup>2</sup></span>) :
															(this.lang.valeur_inconnue)
														}</td>
														<td>{edge.node.population > 0 ?
															(edge.node.population) :
															(this.lang.valeur_inconnue)
														}</td>
														<td>{edge.node.quantiteNouvHumains > 0 ?
															(edge.node.quantiteNouvHumains) :
															(this.lang.valeur_inconnue)
														}</td>
													</tr>)
											) :
												('')
										}
									</tbody>
								</Table>
							</TabPane>
							<TabPane tabId="3">
								<ListGroup>
									<div>
										{this.lang.ville_superficie}
										{data.contentfulPays.superficie > 0 ?
											(<span>{data.contentfulPays.superficie} m<sup>2</sup></span>) :
											(this.lang.valeur_inconnue)
										} <br />
										{this.lang.ville_population}
										{data.contentfulPays.population > 0 ?
											(data.contentfulPays.population) :
											(this.lang.valeur_inconnue)
										} <br />
										{this.lang.ville_nouv_humains}
										{data.contentfulPays.quantiteNouvHumains > 0 ?
											(data.contentfulPays.quantiteNouvHumains) :
											(this.lang.valeur_inconnue)
										}
									</div>
								</ListGroup>
							</TabPane>
							<TabPane tabId="4">
								<ListGroup>
									<div>
										{
											data.contentfulPays.climat ?
												(<div className="my-3">
													<h3>{this.lang.pays_climat}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.climat.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulPays.ressources ?
												(<div className="my-3">
													<h3>{this.lang.pays_ressources}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.ressources.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulPays.typeTerrain ?
												(<div className="my-3">
													<h3>{this.lang.pays_terrain}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.typeTerrain.childMarkdownRemark.html }} />
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
													<h3>{this.lang.pays_dirigeant}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.dirigeants.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulPays.reputation ?
												(<div className="my-3">
													<h3>{this.lang.pays_reputation}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.reputation.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulPays.conflit ?
												(<div className="my-3">
													<h3>{this.lang.pays_conflit}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.conflit.childMarkdownRemark.html }} />
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
													<h3>{this.lang.pays_culture}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.langueCulture.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulPays.religion ?
												(<div className="my-3">
													<h3>{this.lang.pays_religion}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulPays.religion.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
									</div>
								</ListGroup>
							</TabPane>
						</TabContent>
					</Container>

					<Container fluid>
						<div className="pb-5">
							<BackToTop lang={this.props.pageContext.lang} />
						</div>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
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
				slugPaysParent
				quantiteNouvHumains
			}
		}
	}
}`