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
	Card,
	CardBody
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class ListeDesPouvoirs extends Component {
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
						<BreadcrumbItem active>{this.lang.header_pouvoirs}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_pouvoirs + "/"}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">{this.lang.header_pouvoirs}</h1>
						<p className="lead">{this.lang.pouvoirs_intro_text}</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPouvoir.edges.map(
								(edge) =>
									<React.Fragment>
										{
											this.firstLetter != edge.node.nomPouvoir.charAt(0) ?
												(
													<Col lg="12" className="text-center my-3 anim-bounce-in">
														<hr />
														<h3>
															{this.firstLetter = edge.node.nomPouvoir.charAt(0)}
														</h3>
													</Col>
												) :
												('')
										}
										<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3 anim-bounce-in">
											<Link to={this.lang.pouvoirs_url + edge.node.slug + "/"}>{edge.node.nomPouvoir}</Link>
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

ListeDesPouvoirs.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPouvoirs

export const pageQuery = graphql`query listePouvoirQueryFR ($lang: String!) {
    allContentfulPouvoir(sort: {fields: [nomPouvoir], order: ASC}, filter: {node_locale: {eq: $lang}}) {
        edges {
            node {
				id
                nomPouvoir
				slug
				description {
					childMarkdownRemark {
						html
					}
				}
            }
        }
    }
  }`