import React, { Component } from 'react'
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import BlockNouvelles from '../components/block_nouvelles';
import BlockCalendrier from '../components/block_calendrier';
import BlockContinuer from '../components/block_continuer';
import ListProjetPanel from '../components/list_projet_panel';
import EquivURL from '../components/equivURL';
import cookie from 'react-cookies';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            connectedUser: null,
            lecteur: "vide"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") {this.lang = lang_fr;}
        if (this.props.lang === "en-US") {this.lang = lang_en;}

        if (cookie.load('lecteur_connect') == null) {
            cookie.save('lecteur_connect', "vide", { path: '/' });
        }

        if (cookie.load('lecteur_connect') !== "vide") {
            this.state.lecteur = cookie.load('lecteur_connect')
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const {
            data
        } = this.props

        return (
            <Layout>
                <div>
                    <Helmet title={this.lang.header_accueil + this.lang.meta_title}></Helmet>

                    <Header lang={this.props.pageContext.lang} />

                    <EquivURL url={this.lang.other_lang_url + "/"} label={this.lang.other_lang_label} />

                    <Jumbotron fluid>
                        <Container fluid>
                            <h1 className="display-3">{this.lang.accueil_jumbo_titre}</h1>
                            <p className="lead">{this.lang.accueil_jumbo_parag_1}</p>
                            <p className="lead">{this.lang.accueil_jumbo_parag_2}</p>
                            <Link className="btn btn-primary" to={this.lang.header_histoires_url + "/"}>{this.lang.accueil_jumbo_btn_titre}</Link>
                        </Container>
                    </Jumbotron>

                    <Container fluid className="p-0">
                        {
                            this.state.lecteur !== "vide" ?
                                (<Row className="pb-5">
                                    <Col sm="12">
                                        <h2 className="mb-4">{this.lang.continuer_titre}</h2>
                                        <BlockContinuer allChapitre={data.allContentfulChapitre} lang={this.props.pageContext.lang} />
                                    </Col>
                                </Row>) :
                                ('')
                        }

                        <Row className="pb-5">
                            <Col sm="12" lg="8" >
                                <h2 className="mb-4">{this.lang.nouvelles_titre}</h2>
                                <BlockNouvelles allNouvelles={data.allContentfulNouvelle} lang={this.props.pageContext.lang} />
                            </Col>
                            <Col sm="12" lg="4" >
                                <h2 className="mb-4">{this.lang.calendrier_titre}</h2>
                                <BlockCalendrier allCalendrier={data.allContentfulCalendrier} lang={this.props.pageContext.lang} />
                            </Col>
                        </Row>
                        <Row className="pb-5">
                            <Col>
                                <h2 className="mb-4">{this.lang.block_info_titre}</h2>
                                <p>{this.lang.block_info_parag_1_1}<a href={this.lang.block_info_parag_1_url}>{this.lang.block_info_parag_1_name}</a>{this.lang.block_info_parag_1_2}</p>
                                <p>{this.lang.block_info_parag_2}</p>
                                <p>{this.lang.block_info_parag_3}</p>
                            </Col>
                        </Row>
                    </Container>

                    <Container fluid className="p-0">
                        <Row>
                            <Col lg="12">
                                <h2 className="mb-4">{this.lang.header_projets}</h2>
                            </Col>
                        </Row>
                        <ListProjetPanel allProjets={data.allContentfulProject} lang={this.props.pageContext.lang} />
                    </Container>

                    <Footer lang={this.props.pageContext.lang} />
                </div >
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`query listeNouvelleQueryFR ($lang: String!) {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: $lang}}) {
      edges {
        node {
          id
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY-MM-DD")
          dateSpe
          slug
        }
      }
    }
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
                romanSlug
                affiche
			}
		}
	}
	allContentfulChapitre(sort: {fields: [codeChapitre, ordre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
	  edges {
		node {
		  id
		  titreChapitre
		  nomRoman
		  chapitreApres
		  slug
		}
	  }
    }
    allContentfulProject (limit: 6, sort: {fields: [ordre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				titre
				resume {
					childMarkdownRemark {
						html
					}
				}
				slug
				afficher
				terminer
				ordre
			}
		}
	}
  }`