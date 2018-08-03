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
import classnames from 'classnames';
import Header from '../components/header'
import Footer from '../components/footer'
import Btn_like from '../components/btn_like'
import Btn_read from '../components/btn_read'
import Btn_like_disconnect from '../components/btn_like_disconnect'
import { auth, provider } from '../firebase.js';
import cookie from 'react-cookies';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Chapitre extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);

		this.state = {
			user: null,
			lecteur: null
		};

		this.lang = lang_fr;

		if (this.props.pathContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pathContext.lang == "en-US") {
			this.lang = lang_en;
		}
	}

	componentWillMount() {
		this.state.lecteur = cookie.load('lecteur');
	}

	login() {
		auth.signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				this.setState({
					user
				});
				cookie.save('lecteur', this.state.user, { path: '/' });

				window.location.reload();
			});
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
						<BreadcrumbItem><Link to={this.lang.header_histoires_url}>{this.lang.header_histoires}</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={this.lang.list_histoires_url + data.contentfulChapitre.nomRoman}>{this.lang.bc_roman_label}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulChapitre.titreChapitre}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + data.contentfulChapitre.equivalentUrl}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div>
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<h1 className="page-header display-4 text-center my-5">{data.contentfulChapitre.titreChapitre}</h1>
								<div className="text-justify lecture-texte" dangerouslySetInnerHTML={{ __html: data.contentfulChapitre.texte.childMarkdownRemark.html }} />
							</Col>
						</Row>
					</Container>
				</div>

				{/* <div className="py-5">
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								{
									this.state.lecteur != "null" ?
										(<Row>
											<Col xs="6" className="text-center">
												<Btn_read contentChapitre={data.contentfulChapitre} />
											</Col>
											<Col xs="6" className="text-center">
												<Btn_like contentChapitre={data.contentfulChapitre} />
											</Col>
										</Row>) :
										(<Row>
											<Col xs="12" className="text-center">
												<Btn_like_disconnect contentChapitre={data.contentfulChapitre} />
											</Col>
										</Row>)

								}
							</Col>
						</Row>
					</Container>
				</div> */}

				<div className="py-5">
					<Container>
						<Row>
							<Col lg={{ size: 10, offset: 1 }} md="12">
								<Row>
									<Col xs="4" className="text-left pl-0">
										{
											data.contentfulChapitre.chapitreAvant ?
												(<Link className="btn btn-primary" to={this.lang.chapitre_btn_url + data.contentfulChapitre.chapitreAvant}>{this.lang.chapitre_btn_avant}</Link>) :
												('')
										}
									</Col>
									<Col xs="4" className="text-center"><Link className="btn btn-primary" to={this.lang.header_histoires_url + data.contentfulChapitre.nomRoman}>{this.lang.chapitre_btn_roman}</Link></Col>
									<Col xs="4" className="text-right pr-0">
										{
											data.contentfulChapitre.chapitreApres ?
												(<Link className="btn btn-primary" to={this.lang.chapitre_btn_url + data.contentfulChapitre.chapitreApres}>{this.lang.chapitre_btn_apres}</Link>) :
												('')
										}
									</Col>
								</Row>
							</Col>
						</Row>
					</Container>
				</div>

				<Footer lang={this.props.pathContext.lang} />
			</div>
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
	}
}`