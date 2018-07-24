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
import Block_Calendrier from '../components/block_calendrier';

class Calendrier extends Component {
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
						<BreadcrumbItem active>Calendrier des sorties</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/en/calendar"><Button className="float-right" color="primary">En</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Calendrier des sorties</h1>
						<p className="lead">Ici vous trouverez les dates de sortie des prochains chapitres au sujet de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9" >
							<Block_Calendrier allCalendrier={data.allContentfulCalendrier} />
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

Calendrier.propTypes = {
	data: PropTypes.object.isRequired
}

export default Calendrier

export const pageQuery = graphql`query calendrierQueryFR {
	allContentfulCalendrier (sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY-MM-DD")
                dateSpe
				romanSlug
				affiche
			}
		}
	}
  }`