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

class ListeDesPersonnages extends Component {
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
						<BreadcrumbItem active>Nos personnages</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/en/characters">En</Link></Button>
				</div> */}

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Nos personnages</h1>
						<p className="lead">Voici la liste de tous les personnages présents (ou presque) dans l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						{
							data.allContentfulPersonnage.edges.map(
								(edge) =>
									<Col lg="3" md="4" sm="6" key={edge.node.id} className="text-center my-3">
										<Link to={"/personnages/" + edge.node.slug}>{edge.node.nomComplet}</Link>
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

ListeDesPersonnages.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesPersonnages

export const pageQuery = graphql`query listePersonnageQueryFR {
    allContentfulPersonnage(sort: {fields: [nomComplet], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
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