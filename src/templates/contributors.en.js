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
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'

class Contributors extends Component {
	render() {

		return (
			<div id="page-wrapper">
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem active>Contributors</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/contributeurs"><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="py-5">
					<Container fluid>
						<h1 className="display-4">Contributors</h1>
						<p className="lead">These are all the people who have contributed to the New Human Universe.</p>
					</Container>
				</div>

				<Container fluid className="p-0">
					<Row className="pb-5">
						<Col sm="12" lg="9">
							<div className="clearfix mb-2">
								<Row className="no-gutters">
									<Col lg="12">
										<div><a href="https://thomas-desfossez.com">Thomas Desfossez</a> - Design of the website</div>
										<div><a href="http://sarahbourque.ca">Sarah Bourque</a> - Illustrations</div>
										<div>Maeva G - Help creating the Universe</div>
										<div>Marie-Josée Cloutier - Corrections</div>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Container>

				<FooterEn />
			</div>
		)
	}
}

Contributors.propTypes = {
	data: PropTypes.object.isRequired
}

export default Contributors