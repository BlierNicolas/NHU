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
import Block_Nouvelles from '../components/block_nouvelles';

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
					<Link className="text-white" to="/en/news"><Button className="float-right" color="primary">En</Button></Link>
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
							<Block_Nouvelles allNouvelles={data.allContentfulNouvelle} />
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
				date(formatString: "YYYY-MM-DD")
				dateSpe
				slug
			}
		}
	}
  }`