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
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Ville extends Component {
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
						<BreadcrumbItem><Link to={this.lang.header_giervia_url + "/"}>{this.lang.header_giervia}</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={this.lang.equi_pays + data.contentfulVille.slugPaysParent + "/"}>{data.contentfulVille.nomPaysParent}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulVille.nomVille}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + data.contentfulVille.equivalentUrl + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<Container className="pb-5">
					<Row>
						<Col lg="12" md="12">
							<div className="mt-5 mb-3">
								<div>
									<h1 className="display-4">{data.contentfulVille.nomVille} - <small className="font-weight-300"><Link to={this.lang.monde_url + data.contentfulVille.slugPaysParent + "/"}>{data.contentfulVille.nomPaysParent}</Link></small></h1>
									{
										data.contentfulVille.description ?
											(<div className="my-3">
												<div>
													<h3>{this.lang.pays_description}</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.description.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulVille.histoire ?
											(<div className="my-3">
												<div>
													<h3>{this.lang.pays_histoire}</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.histoire.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									<div>
										{this.lang.ville_superficie + data.contentfulVille.superficie} m<sup>2</sup><br />
										{this.lang.ville_population + data.contentfulVille.population}<br />
										{this.lang.ville_nouv_humains + data.contentfulVille.quantiteNouvHumains}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
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