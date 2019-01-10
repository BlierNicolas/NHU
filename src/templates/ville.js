import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Container,
	Row,
	Col
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Ville extends Component {
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
					<Helmet title={data.contentfulVille.nomVille + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={4} un_url={this.lang.header_giervia_url} un={this.lang.header_giervia} deux_url={this.lang.monde_url + data.contentfulVille.slugPaysParent} deux={data.contentfulVille.nomPaysParent} active={data.contentfulVille.nomVille} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulVille.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<Container className="pb-5">
						<Row>
							<Col lg="12" md="12">
								<div className="mt-5 mb-3">
									<div>
										<h1 className="display-4 display-title">{data.contentfulVille.nomVille} - <small className="font-weight-300"><Link to={this.lang.monde_url + data.contentfulVille.slugPaysParent + "/"}>{data.contentfulVille.nomPaysParent}</Link></small></h1>
										{
											data.contentfulVille.description ?
												(<div className="my-3">
													<h3>{this.lang.pays_description}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.description.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										{
											data.contentfulVille.histoire ?
												(<div className="my-3">
													<h3>{this.lang.pays_histoire}</h3>
													<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.histoire.childMarkdownRemark.html }} />
												</div>) :
												('')
										}
										<div>
											{this.lang.ville_superficie}
											{data.contentfulVille.superficie > 0 ?
												(<span>{data.contentfulVille.superficie} m<sup>2</sup></span>) :
												(this.lang.valeur_inconnue)
											} <br />
											{this.lang.ville_population}
											{data.contentfulVille.population > 0 ?
												(data.contentfulVille.population) :
												(this.lang.valeur_inconnue)
											} <br />
											{this.lang.ville_nouv_humains}
											{data.contentfulVille.quantiteNouvHumains > 0 ?
												(data.contentfulVille.quantiteNouvHumains) :
												(this.lang.valeur_inconnue)
											}
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</Container>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Ville.propTypes = {
	data: PropTypes.object.isRequired
}

export default Ville

export const pageQuery = graphql`query villeQueryFR ($slug: String!, $lang: String!) {
	contentfulVille(slug: {eq: $slug}, node_locale: {eq: $lang}) {
		nomVille
		slug
				equivalentUrl
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
		nomDesCitoyens
		superficie
		population
		quantiteNouvHumains
		nomPaysParent
		slugPaysParent
		nomContinentParent
	}
}`