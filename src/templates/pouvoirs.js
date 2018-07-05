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

class ListeDesPouvoirs extends Component {
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
						<BreadcrumbItem active>Abilités des personnages</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/en/powers">En</Link></Button>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Abilités des personnages</h1>
						<p className="lead">Voici tous les pouvoirs qui sont présents dans l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPouvoir.edges.map(
								(edge) =>
									<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3">
										<Link to={'/pouvoirs/' + edge.node.slug}>{edge.node.nomPouvoir}</Link>
									</Col>
							)
						}
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

ListeDesPouvoirs.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPouvoirs

export const pageQuery = graphql`query listePouvoirQueryFR {
    allContentfulPouvoir(sort: {fields: [nomPouvoir], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
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