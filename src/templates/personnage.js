import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import EquivURL from '../components/equivURL';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Personnage extends Component {
    constructor(props) {
        super(props);

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.lang === "en-US") { this.lang = lang_en; }
    }

    render() {
        const {
            data
        } = this.props

        return (
            <Layout>
                <div id="page-wrapper">
                    <Helmet title={data.contentfulPersonnage.nomComplet + this.lang.meta_title}></Helmet>

                    <Header lang={this.props.pageContext.lang} />

                    <div>
                        <Breadcrumb className="mb-0">
                            <BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={this.lang.header_personnages_url + "/"}>{this.lang.header_personnages}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{data.contentfulPersonnage.nomComplet}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <EquivURL url={this.lang.other_lang_url + data.contentfulPersonnage.equivalentUrl + "/"} label={this.lang.other_lang_label} />

                    <Container fluid>
                        <Row className="pb-5">
                            <Col lg={{ size: 8, offset: 2 }} md="12">
                                <div className="mt-5 mb-3">
                                    <div>
                                        <h1 className="display-4">{data.contentfulPersonnage.nomComplet}</h1>
                                        <div>
                                            {
                                                data.contentfulPersonnage.pouvoirNom ?
                                                    (<div>
                                                        {this.lang.personnage_pouvoir_label + data.contentfulPersonnage.pouvoirNom}<br />
                                                    </div>) :
                                                    ('')
                                            }
                                            {this.lang.personnage_alignement_label + data.contentfulPersonnage.alignement}<br />
                                            {this.lang.personnage_naissance_label + data.contentfulPersonnage.dateNaissance}<br />
                                            {this.lang.personnage_age_label + data.contentfulPersonnage.age}
                                        </div>
                                    </div>
                                </div>
                                {
                                    data.contentfulPersonnage.descriptionSommaire ?
                                        (<div className="my-3">
                                            <h3>{this.lang.personnage_desc_sommaire_titre}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionSommaire.childMarkdownRemark.html }} />
                                        </div>) :
                                        ('')
                                }
                                {
                                    data.contentfulPersonnage.descriptionPouvoir ?
                                        (<div className="my-3">
                                            <h3>{this.lang.personnage_desc_pouvoir_titre}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPouvoir.childMarkdownRemark.html }} />
                                        </div>) :
                                        ('')
                                }
                                {
                                    data.contentfulPersonnage.descriptionPhysique ?
                                        (<div className="my-3">
                                            <h3>{this.lang.personnage_desc_physique_titre}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.descriptionPhysique.childMarkdownRemark.html }} />
                                        </div>) :
                                        ('')
                                }
                                {
                                    data.contentfulPersonnage.relation ?
                                        (<div className="my-3">
                                            <h3>{this.lang.personnage_relations_titre}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.relation.childMarkdownRemark.html }} />
                                        </div>) :
                                        ('')
                                }
                                {
                                    data.contentfulPersonnage.apparition ?
                                        (<div className="my-3">
                                            <h3>{this.lang.personnage_apparitions_titre}</h3>
                                            <div dangerouslySetInnerHTML={{ __html: data.contentfulPersonnage.apparition.childMarkdownRemark.html }} />
                                        </div>) :
                                        ('')
                                }
                            </Col>
                        </Row>
                    </Container>

                    <Footer lang={this.props.pageContext.lang} />
                </div>
            </Layout>
        )
    }
}

Personnage.propTypes = {
    data: PropTypes.object.isRequired
}

export default Personnage

export const pageQuery = graphql`query personnageQueryFR ($slug: String!, $lang: String!) {
    contentfulPersonnage(slug: {eq: $slug}, node_locale: {eq: $lang}) {
      nomComplet
      dateNaissance
      age
      pouvoirNom
      alignement
      descriptionSommaire {
        childMarkdownRemark {
          html
        }
      }
      descriptionPouvoir {
        childMarkdownRemark {
          html
        }
      }
      descriptionPhysique {
        childMarkdownRemark {
          html
        }
      }
      relation {
        childMarkdownRemark {
          html
        }
      }
      apparition {
        childMarkdownRemark {
          html
        }
      }
      typeGene
      slug
      equivalentUrl
    }
  }`