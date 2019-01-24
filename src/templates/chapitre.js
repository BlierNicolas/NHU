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
import BtnLike from '../components/btn_like'
import BtnRead from '../components/btn_read'
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import BtnLikeDisconnect from '../components/btn_like_disconnect'
// import BackToTop from '../components/back_to_top';
import { auth, provider } from 'firebase/app';
import cookie from 'react-cookies';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Chapitre extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);

		this.state = {
			user: null,
			lecteur: "vide"
		};

		/** Buffer de la langue par défaut */
		this.lang = lang_fr;

		/** Trouve la bonne langue */
		if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
		if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }

		if (cookie.load('lecteur_connect') == null) {
			cookie.save('lecteur_connect', "vide", { path: '/' });
		}

		if (cookie.load('lecteur_connect') !== "vide") {
			this.state.lecteur = cookie.load('lecteur_connect')
		}
	}

	login() {
		if (typeof window !== "undefined") {
			auth.signInWithPopup(provider)
				.then((result) => {
					const user = result.user;
					this.setState({
						user
					});
					cookie.save('lecteur_connect', this.state.user, { path: '/' });

					window.location.reload();
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
					<Helmet title={data.contentfulChapitre.titreChapitre + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={4} un_url={this.lang.header_histoires_url} un={this.lang.header_histoires} deux_url={this.lang.list_histoires_url + data.contentfulChapitre.nomRoman} deux={this.lang.bc_roman_label} active={data.contentfulChapitre.titreChapitre} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulChapitre.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<div>
						<Container>
							<Row>
								<Col lg={{ size: 10, offset: 1 }} md="12">
									<h1 className="page-header display-4 text-center my-5 display-title">{data.contentfulChapitre.titreChapitre}</h1>
									<p className="lecture-texte temps_lecture">{this.lang.chapitre_read_time_label + "±" + data.contentfulChapitre.readTime + " " + this.lang.chapitre_read_time}</p>
									<div className="text-justify lecture-texte" dangerouslySetInnerHTML={{ __html: data.contentfulChapitre.texte.childMarkdownRemark.html }} />
								</Col>
							</Row>
						</Container>
					</div>

					<div className="py-5">
						<Container>
							<Row>
								<Col lg={{ size: 10, offset: 1 }} md="12">
									{
										this.state.lecteur !== "vide" ?
											(<Row>
												<Col xs="6" className="text-center">
													<BtnRead contentChapitre={data.contentfulChapitre} lang={this.props.pageContext.lang} />
												</Col>
												<Col xs="6" className="text-center">
													<BtnLike contentChapitre={data.contentfulChapitre} lang={this.props.pageContext.lang} />
												</Col>
											</Row>) :
											(<Row>
												<Col xs="12" className="text-center">
													<BtnLikeDisconnect contentChapitre={data.contentfulChapitre} lang={this.props.pageContext.lang} />
												</Col>
											</Row>)

									}
								</Col>
							</Row>
						</Container>
					</div>

					<div className="py-5">
						<Container>
							<Row>
								<Col lg={{ size: 10, offset: 1 }} md="12">
									<Row>
										<Col xs="4" className="text-left pl-0">
											{
												data.contentfulChapitre.chapitreAvant ?
													(<Link className="btn btn-primary" to={this.lang.chapitre_btn_url + data.contentfulChapitre.chapitreAvant + "/"}>{this.lang.chapitre_btn_avant}</Link>) :
													('')
											}
										</Col>
										<Col xs="4" className="text-center"><Link className="btn btn-primary" to={this.lang.list_histoires_url + data.contentfulChapitre.nomRoman + "/"}>{this.lang.chapitre_btn_roman}</Link></Col>
										<Col xs="4" className="text-right pr-0">
											{
												data.contentfulChapitre.chapitreApres ?
													(
														data.contentfulChapitre.chapitreApres !== data.contentfulChapitre.slug ?
															(<Link className="btn btn-primary" to={this.lang.chapitre_btn_url + data.contentfulChapitre.chapitreApres + "/"}>{this.lang.chapitre_btn_apres}</Link>) :
															('')
													) :
													('')
											}
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</div>

					{/* <Container fluid>
						<div className="pb-5">
							<BackToTop lang={this.props.pageContext.lang} />
						</div>
					</Container> */}

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Chapitre.propTypes = {
	data: PropTypes.object.isRequired
}

export default Chapitre

export const pageQuery = graphql`query chapitreQueryFR ($slug: String!, $lang: String!) {
	contentfulChapitre(slug: {eq:$slug}, node_locale: {eq: $lang}) {
		titreChapitre
		texte {
			childMarkdownRemark {
				html
			}
		}
        chapitreAvant
        chapitreApres
        nomRoman
		slug
		codeChapitre
		equivalentUrl
		readTime
	}
}`