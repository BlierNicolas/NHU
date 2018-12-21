import React, { Component } from 'react';
import { graphql } from "gatsby";
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import BlockIntro from '../components/block_intro';
import EquivURL from '../components/equivURL';
import BreadcrumbCompo from '../components/breadcrumb_compo';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Nombre extends Component {
    constructor(props) {
        super(props);

        this.histoireEnCours = 0;
        this.histoireTerminees = 0;

        /** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.pageContext.lang === "fr-CA") { this.lang = lang_fr; }
        if (this.props.pageContext.lang === "en-US") { this.lang = lang_en; }

        this.props.data.allContentfulRoman.edges.map(
            (edge) =>
                edge.node.chapitreActuel < edge.node.maximumChapitre ?
                    this.histoireEnCours += 1 : ''
        )

        this.props.data.allContentfulRoman.edges.map(
            (edge) =>
                edge.node.chapitreActuel === edge.node.maximumChapitre ?
                    this.histoireTerminees += 1 : ''
        )
    }

    render() {
        const {
            data
        } = this.props;

        return (
            <Layout>
                <div id="page-wrapper">
                    <Helmet title={this.lang.header_nombre + this.lang.meta_title}></Helmet>

                    <Header lang={this.props.pageContext.lang} />

					<BreadcrumbCompo number={2} active={this.lang.header_nombre} />

                    <EquivURL url={this.lang.equi_nombre + "/"} label={this.lang.other_lang_label} />

                    <BlockIntro full={false} titre={this.lang.header_nombre} first={this.lang.nombre_intro_text} />

                    <Container className="pb-5">
                        <Row>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_histoires + data.allContentfulRoman.totalCount}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_en_cours + this.histoireEnCours}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_termines + this.histoireTerminees}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_chapitre + data.allContentfulChapitre.totalCount}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_groupes + data.allContentfulGroupe.totalCount}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_theories + data.allContentfulTheorie.totalCount}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_personnages + data.allContentfulPersonnage.totalCount}</Col>
                            <Col sm="12" md="6" lg="4" className="mb-3">{this.lang.nombre_pouvoirs + data.allContentfulPouvoir.totalCount}</Col>
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