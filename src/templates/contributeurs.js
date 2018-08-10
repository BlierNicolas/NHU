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
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Contributeurs extends Component {
	constructor(props) {
		super(props);

		this.lang = lang_fr;

		if (this.props.pathContext.lang == "fr-CA") {
			this.lang = lang_fr;
		}
		if (this.props.pathContext.lang == "en-US") {
			this.lang = lang_en;
		}
	}
	
	render() {

		return (
			<div id="page-wrapper">
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{this.lang.header_contributeurs}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_contributeurs + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_contributeurs}</h1>
						<p className="lead">{this.lang.contributeurs_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9">
							<div className="clearfix mb-2">
								<Row className="no-gutters">
									<Col lg="12">
										<div><a href="https://thomas-desfossez.com">Thomas Desfossez</a> - {this.lang.contributeurs_design}</div>
										<div><a href="http://sarahbourque.ca">Sarah Bourque</a> - {this.lang.contributeurs_illustration}</div>
										<div>Maeva G - {this.lang.contributeurs_creation}</div>
										<div>Marie-Josée Cloutier - {this.lang.contributeurs_correction}</div>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

Contributeurs.propTypes = {
	data: PropTypes.object.isRequired
}

export default Contributeurs