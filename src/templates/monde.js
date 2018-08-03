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
	Button,
	Collapse,
	Card,
	CardBody
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class Monde extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: false };

        this.lang = lang_fr;

        if (this.props.pathContext.lang == "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.pathContext.lang == "en-US") {
            this.lang = lang_en;
        }
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
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
						<BreadcrumbItem active>{data.contentfulMonde.nomPlanete}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.other_lang_url + data.contentfulMonde.equivalentUrl}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_giervia}</h1>
						<p className="lead">{this.lang.monde_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="mb-5">
					<div className="d-flex justify-content-center">
						<Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.lang.monde_carte}</Button>
					</div>
					<Collapse isOpen={this.state.collapse}>
						<Card>
							<CardBody>
								<div className="d-flex justify-content-center">
									<img className="img-fluid" src={data.contentfulMonde.carte.file.url} />
								</div>
							</CardBody>
						</Card>
					</Collapse>
				</Container>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" md="6" lg="3">
							<div className="">
								<h3>Fontil</h3>
							</div>
							{
								data.allContentfulPays.edges.map(
									(edge) =>
										<div className="clearfix mb-2" key={edge.node.id}>
											{edge.node.nomContinent == "Fontil" ?
												(<div>
													<div>
														<Row className="no-gutters">
															<Col md="3" sm="12">
																<Link className="mb-2" to={this.lang.monde_url + edge.node.slug}>{edge.node.nomPays}</Link>
															</Col>
														</Row>
													</div>
												</div>) :
												('')
											}
										</div>
								)
							}
						</Col>
						<Col sm="12" md="6" lg="3">
							<div className="">
								<h3>Vactil</h3>
							</div>
							{
								data.allContentfulPays.edges.map(
									(edge) =>
										<div className="clearfix mb-2" key={edge.node.id}>
											{edge.node.nomContinent == "Vactil" ?
												(<div>
													<div>
														<Row className="no-gutters">
															<Col md="3" sm="12">
																<Link className="mb-2" to={this.lang.monde_url + edge.node.slug}>{edge.node.nomPays}</Link>
															</Col>
														</Row>
													</div>
												</div>) :
												('')
											}
										</div>
								)
							}
						</Col>
						<Col sm="12" md="6" lg="3">
							<div className="">
								<h3>Xentil</h3>
							</div>
							{
								data.allContentfulPays.edges.map(
									(edge) =>
										<div className="clearfix mb-2" key={edge.node.id}>
											{edge.node.nomContinent == "Xentil" ?
												(<div>
													<div>
														<Row className="no-gutters">
															<Col md="3" sm="12">
																<Link className="mb-2" to={this.lang.monde_url + edge.node.slug}>{edge.node.nomPays}</Link>
															</Col>
														</Row>
													</div>
												</div>) :
												('')
											}
										</div>
								)
							}
						</Col>
						<Col sm="12" md="6" lg="3">
							<div className="">
								<h3>{this.lang.monde_iles}</h3>
							</div>
							{
								data.allContentfulPays.edges.map(
									(edge) =>
										<div className="clearfix mb-2" key={edge.node.id}>
											{edge.node.nomContinent == "Iles" ?
												(<div>
													<div>
														<Row className="no-gutters">
															<Col md="3" sm="12">
																<Link className="mb-2" to={this.lang.monde_url + edge.node.slug}>{edge.node.nomPays}</Link>
															</Col>
														</Row>
													</div>
												</div>) :
												('')
											}
										</div>
								)
							}
						</Col>
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

Monde.propTypes = {
	data: PropTypes.object.isRequired
}

export default Monde

export const pageQuery = graphql`query mondeQueryFR ($lang: String!) {
	contentfulMonde(slug: {eq:"giervia"}, node_locale: {eq: $lang}) {
		nomPlanete
		slug
		equivalentUrl
		carte {
		  file {
			url
		  }
		}
	}
	allContentfulPays(sort: {fields: [nomPays], order: ASC}, filter: {node_locale: {eq: $lang}}) {
		edges {
			node {
				id
				nomPays
				slug
				nomContinent
			}
		}
	}
}`