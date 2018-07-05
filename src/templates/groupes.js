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
import Header from '../components/Header'
import Footer from '../components/Footer'

class ListeDesGroupes extends Component {
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
						<BreadcrumbItem active>Groupes, clans et organisations...</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/en/groups">En</Link></Button>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Groupes, clans et organisations...</h1>
						<p className="lead">Voici tous les groupes faisant parti de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulGroupe.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={'groupes/' + edge.node.slug}><h2><small>{edge.node.nomGroupe}</small></h2></Link>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={'groupes/' + edge.node.slug}>Voir les détails</Link>
													</Col>
												</Row>
											</div>
										</div>
								)
							}
						</Col>
						<Col sm="12" lg="3" >
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

ListeDesGroupes.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesGroupes

export const pageQuery = graphql`query listeGroupeQueryFR {
	allContentfulGroupe (filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				nomGroupe
				description {
					childMarkdownRemark {
						html
					}
				}
				slug
			}
		}
	}
  }`