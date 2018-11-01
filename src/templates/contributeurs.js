import React, { Component } from 'react';
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
import BlockIntro from '../components/block_intro';
import EquivURL from '../components/equivURL';
import Helmet from 'react-helmet'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

import Layout from '../components/layout'

class Contributeurs extends Component {
	constructor(props) {
		super(props);

		/** Buffer de la langue par défaut */
        this.lang = lang_fr;

        /** Trouve la bonne langue */
        if (this.props.lang === "fr-CA") {this.lang = lang_fr;}
        if (this.props.lang === "en-US") {this.lang = lang_en;}
	}

	render() {

		return (
			<Layout>
				<div id="page-wrapper">
					<Helmet title={this.lang.header_contributeurs + this.lang.meta_title}></Helmet>

					<Header lang={this.props.pageContext.lang} />

					<div>
						<Breadcrumb className="mb-0">
							<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
							<BreadcrumbItem active>{this.lang.header_contributeurs}</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<EquivURL url={this.lang.equi_contributeurs + "/"} label={this.lang.other_lang_label} />

					<BlockIntro full={true} titre={this.lang.header_contributeurs} first={this.lang.contributeurs_intro_text} />

					<Container fluid className="p-0">
						<Row className="pb-5">
							<Col sm="12" lg="9">
								<div className="clearfix mb-2">
									<Row className="no-gutters">
										<Col lg="12">
											<div><a href="https://thomas-desfossez.com/">Thomas Desfossez</a> - {this.lang.contributeurs_design}</div>
											<div><a href="https://www.artstation.com/sarahbourque">Sarah Bourque</a> - {this.lang.contributeurs_illustration}</div>
											<div>Maeva G - {this.lang.contributeurs_creation}</div>
											<div>Marie-Josée Cloutier - {this.lang.contributeurs_correction}</div>
										</Col>
									</Row>
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

Contributeurs.propTypes = {
	data: PropTypes.object.isRequired
}

export default Contributeurs