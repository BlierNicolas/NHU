import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Col,
	Row,
	Container,
	ListGroup,
	ListGroupItem,
	Progress
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import { auth, provider } from 'firebase/app';
import cookie from 'react-cookies';
import BtnLike from '../components/btn_like';
import BtnRead from '../components/btn_read'
import BtnLikeDisconnect from '../components/btn_like_disconnect'
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Roman extends Component {
	constructor(props) {
		super(props);

		this.login = this.login.bind(this);

		this.state = {
			user: null,
			lecteur: null
		};

		/** Buffer de la langue par défaut */
		this.lang = lang_fr;

		/** Trouve la bonne langue */
		if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
		if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }

		if (cookie.load('lecteur_connect') == null) {
			cookie.save('lecteur_connect', "vide", { path: '/' });
		}

		if (cookie.load('lecteur_connect') !== null) {
			this.state.lecteur = cookie.load('lecteur_connect')
		}
	}

	// UNSAFE_componentWillMount() {
	// 	this.setState({ lecteur: cookie.load('lecteur') });
	// }

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
		} = this.props;

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={data.contentfulRoman.titreRoman + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={3} un_url={this.lang.header_histoires_url} un={this.lang.header_histoires} active={data.contentfulRoman.titreRoman} />

					<EquivURL url={this.lang.other_lang_url + data.contentfulRoman.equivalentUrl + "/"} label={this.lang.other_lang_label} />

					<div className="my-5">
						<Container>
							<Row>
								<Col lg="12">
									<h1 className="display-4 mb-5 display-title">{data.contentfulRoman.titreRoman}</h1>
								</Col>
							</Row>

							<Row>
								{data.contentfulRoman.imageCouverture ?
									(<Col lg="4">
										<img className="img-fluid mb-5" src={data.contentfulRoman.imageCouverture.file.url} alt="cover" />
									</Col>) : ('')
								}

								<Col>
									<div className="lead" dangerouslySetInnerHTML={{ __html: data.contentfulRoman.resume.childMarkdownRemark.html }} />

									<Progress animated value={(data.contentfulRoman.chapitreActuel / data.contentfulRoman.maximumChapitre) * 100}>{data.contentfulRoman.chapitreActuel + "/" + data.contentfulRoman.maximumChapitre}</Progress>

									<ListGroup className="pt-5">
										{
											data.allContentfulChapitre.edges.map(
												(edge) => <ListGroupItem className="border-0 pl-0 pt-0" key={edge.node.id}>
													<Link to={this.lang.chapitre_btn_url + edge.node.slug + "/"}>{edge.node.titreChapitre}</Link> ({this.lang.chapitre_read_time_label + "±" + edge.node.readTime + " " + this.lang.chapitre_read_time})
														{
														this.state.lecteur !== "vide" ?
															(<React.Fragment>
																<span>
																	&nbsp;<BtnRead contentChapitre={edge.node} lang={this.props.pageContext.lang} />
																</span>
																<span>
																	&nbsp;<BtnLike contentChapitre={edge.node} lang={this.props.pageContext.lang} />
																</span>
															</React.Fragment>) :
															(<span>
																&nbsp;<BtnLikeDisconnect contentChapitre={edge.node} lang={this.props.pageContext.lang} />
															</span>)
													}
												</ListGroupItem>)
										}
									</ListGroup>
								</Col>
							</Row>
							<br />
						</Container>
					</div>

					<Footer lang={this.props.pageContext.lang} />
				</div>
			</Layout>
		)
	}
}

Roman.propTypes = {
	data: PropTypes.object.isRequired
}

export default Roman

export const pageQuery = graphql`query romanQueryFR ($slug: String!, $lang: String!) {
  contentfulRoman(slug: {eq: $slug}, node_locale: {eq: $lang}) {
    titreRoman
    resume {
      childMarkdownRemark {
        html
      }
    }
    imageCouverture {
      file {
        url
      }
    }
    typeHistoire
    chapitreActuel
    maximumChapitre
    slug
    equivalentUrl
}
  allContentfulChapitre(sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: $lang}, nomRoman: {eq: $slug}}) {
    edges {
      node {
        id
        titreChapitre
		nomRoman
		chapitreApres
		codeChapitre
		slug
		readTime
      }
    }
  }
}`