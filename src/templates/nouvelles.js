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

class ListeDesNouvelles extends Component {
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
						<BreadcrumbItem active>Quoi de nouveau&nbsp;?</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/en/news">En</Link></Button>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Quoi de nouveau&nbsp;?</h1>
						<p className="lead">Voici toutes les nouvelles par rapport au site et aux informations au sujet de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							{
								data.allContentfulNouvelle.edges.map(
									(edge) =>
										<div className="clearfix border-bottom mb-2" key={edge.node.id}>
											<div className="">
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<Link to={'nouvelles/' + edge.node.slug}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
													</Col>

													<Col md="3" sm="12">
														<span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
													</Col>
												</Row>
											</div>
											<div>
												<Row className="no-gutters">
													<Col md="9" sm="12">
														<div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
													</Col>

													<Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
														<Link className="float-right mb-2" to={'nouvelles/' + edge.node.slug}>En savoir plus</Link>
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

ListeDesNouvelles.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesNouvelles

export const pageQuery = graphql`query listeNouvelleQueryFR2 {
	allContentfulNouvelle (sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titreNouvelle
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY MMMM DD")
				dateSpe
				slug
			}
		}
	}
  }`