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

class ListeDesTheories extends Component {
	render() {
		const {
			data
		} = this.props

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem active>L'encyclopédie universelle</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/en/encyclopedia"><Button className="float-right" color="primary">En</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">L'encyclopédie universelle</h1>
						<p className="lead">Voici toutes les théories au sujet de l'Univers des Nouveaux Humains.</p>
						<p className="lead">Attention au spoil!</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulTheorie.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={'encyclopedie/' + edge.node.slug}><h2><small>{edge.node.titre}</small></h2></Link>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div className="card-text" dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={'encyclopedie/' + edge.node.slug}>Voir les détails</Link>
													</Col>
												</Row>
											</div>
										</div>
								)
							}
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

ListeDesTheories.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesTheories

export const pageQuery = graphql`query listeTheorieQueryFR {
	allContentfulTheorie (filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				texte {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`