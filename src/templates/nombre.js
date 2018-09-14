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
    BreadcrumbItem,
    Input,
    Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Nombre extends Component {
    constructor(props) {
        super(props);

        this.histoireEnCours = 0;
        this.histoireTerminees = 0;

        this.lang = lang_fr;

        if (this.props.pageContext.lang === "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.pageContext.lang === "en-US") {
            this.lang = lang_en;
        }
    }

    UNSAFE_componentWillMount() {
        this.histoireEnCours = 0;
        this.histoireTerminees = 0;
    }

    render() {
        const {
            data
        } = this.props;

        return (
            <Layout>
                <div id="page-wrapper">
                    <Header lang={this.props.pageContext.lang} />

                    <div>
                        <Breadcrumb className="mb-0">
                            <BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.lang.header_nombre}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <div className="equiv">
                        <Link className="text-white" to={this.lang.equi_nombre + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
                    </div>

                    <div className="my-5">
                        <Container>
                            <h1 className="display-4">{this.lang.header_nombre}</h1>
                            <p className="lead">{this.lang.nombre_intro_text}</p>
                        </Container>
                    </div>

                    <Container className="pb-5">
                        <Row>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_histoires + data.allContentfulRoman.totalCount}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                <Input type="hidden" name="" hidden value={this.histoireEnCours = 0} />
                                {
                                    data.allContentfulRoman.edges.map(
                                        (edge) =>
                                            edge.node.chapitreActuel < edge.node.maximumChapitre ?
                                                this.histoireEnCours += 1 : ''
                                    )
                                }
                                {this.lang.nombre_en_cours + this.histoireEnCours}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {
                                    <Input type="hidden" name="" hidden value={this.histoireTerminees = 0} />
                                }
                                {
                                    data.allContentfulRoman.edges.map(
                                        (edge) =>
                                            edge.node.chapitreActuel === edge.node.maximumChapitre ?
                                                this.histoireTerminees += 1 : ''
                                        
                                    )
                                }
                                {this.lang.nombre_termines + this.histoireTerminees}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_chapitre + data.allContentfulChapitre.totalCount}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_groupes + data.allContentfulGroupe.totalCount}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_theories + data.allContentfulTheorie.totalCount}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_personnages + data.allContentfulPersonnage.totalCount}
                            </Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">
                                {this.lang.nombre_pouvoirs + data.allContentfulPouvoir.totalCount}
                            </Col>
                        </Row>
                    </Container>

                    <Footer lang={this.props.pageContext.lang} />
                </div>
            </Layout>
        )
    }
}

Nombre.propTypes = {
    data: PropTypes.object.isRequired
}

export default Nombre

export const pageQuery = graphql`query nombreQueryFR ($lang: String!) {
    allContentfulChapitre(filter: {node_locale: {eq: $lang}}) {
        totalCount
    }
    allContentfulRoman(filter: {node_locale: {eq: $lang}}) {
        totalCount
        edges {
            node {
                id
                typeHistoire
                chapitreActuel
                maximumChapitre
            }
        }
    }
    allContentfulGroupe(filter: {node_locale: {eq: $lang}}) {
        totalCount
    }
    allContentfulTheorie(filter: {node_locale: {eq: $lang}}) {
        totalCount
    }
    allContentfulPouvoir(filter: {node_locale: {eq: $lang}}) {
        totalCount
    }
    allContentfulPersonnage(filter: {node_locale: {eq: $lang}}) {
        totalCount
    }
}`