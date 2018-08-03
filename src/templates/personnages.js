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

class ListeDesPersonnages extends Component {
	constructor(props) {
		super(props);

		this.firstLetter = '';

        this.lang = lang_fr;

        if (this.props.pathContext.lang == "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.pathContext.lang == "en-US") {
            this.lang = lang_en;
        }
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
						<BreadcrumbItem active>{this.lang.header_personnages}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_personnages}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_personnages}</h1>
						<p className="lead">{this.lang.personnages_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPersonnage.edges.map(
								(edge) =>
								<React.Fragment>
									{
										this.firstLetter != edge.node.nomComplet.charAt(0) ?
											(
												<Col lg="12" className="text-center my-3">
													<hr />
													<h3>
														{this.firstLetter = edge.node.nomComplet.charAt(0)}
													</h3>
												</Col>
											) :
											('')
									}
									<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3">
										<Link to={this.lang.personnages_url + edge.node.slug}>{edge.node.nomComplet}</Link>
									</Col>
								</React.Fragment>
							)
						}
					</Row>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

ListeDesPersonnages.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPersonnages

export const pageQuery = graphql`query listePersonnageQueryFR ($lang: String!) {
    allContentfulPersonnage(sort: {fields: [nomComplet], order: ASC}, filter: {node_locale: {eq: $lang}}) {
        edges {
            node {
				id
                nomComplet
                image {
                    file {
                        url
                    }
                }
                alignement
                slug
            }
        }
    }
  }`