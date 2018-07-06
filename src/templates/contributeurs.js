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

class Contributeurs extends Component {
	render() {

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem active>Contributeurs</BreadcrumbItem>
					</Breadcrumb>
				</div>

				{/* <div className="equiv">
					<Button className="float-right" color="primary"><Link className="text-white" to="/en/contributors">En</Link></Button>
				</div> */}

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Contributeurs</h1>
						<p className="lead">Voici toutes les personnes qui ont contribués à l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9">
							<div className="clearfix mb-2">
								<Row className="no-gutters">
									<Col lg="12">
										<div><a href="https://thomas-desfossez.com">Thomas Desfossez</a> - Design du site</div>
										<div><a href="http://sarahbourque.ca">Sarah Bourque</a> - Illustrations</div>
										<div>Maeva G - Aide à la création de l'Univers</div>
										<div>Marie-Josée Cloutier - Corrections</div>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

Contributeurs.propTypes = {
	data: PropTypes.object.isRequired
}

export default Contributeurs