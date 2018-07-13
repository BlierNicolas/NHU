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
	Nav,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	ListGroup,
	Table
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';

class City extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};
	}

	toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	render() {
		const {
			data
		} = this.props

		return (
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to="/en/giervia">Giervia</Link></BreadcrumbItem>
						<BreadcrumbItem><Link to={"/en/giervia/" + data.contentfulVille.slugPaysParent}>{data.contentfulVille.nomPaysParent}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{data.contentfulVille.nomVille}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={data.contentfulVille.equivalentUrl}><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<Container className="pb-5">
					<Row>
						<Col lg="12" md="12">
							<div className="mt-5 mb-3">
								<div>
									<h1 className="display-4">{data.contentfulVille.nomVille} - <small className="font-weight-300"><Link to={"/giervia/" + data.contentfulVille.slugPaysParent}>{data.contentfulVille.nomPaysParent}</Link></small></h1>
									{
										data.contentfulVille.description ?
											(<div className="my-3">
												<div>
													<h3>Description</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.description.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									{
										data.contentfulVille.histoire ?
											(<div className="my-3">
												<div>
													<h3>History</h3>
													<div>
														<div dangerouslySetInnerHTML={{ __html: data.contentfulVille.histoire.childMarkdownRemark.html }} />
													</div>
												</div>
											</div>) :
											('')
									}
									<div>
										Area: {data.contentfulVille.superficie} m<sup>2</sup><br />
										Population: {data.contentfulVille.population}<br />
										Amount of New Humans: {data.contentfulVille.quantiteNouvHumains}
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>

				<Footer />
			</div>
		)
	}
}

City.propTypes = {
	data: PropTypes.object.isRequired
}

export default City

export const pageQuery = graphql`query villeQueryEn ($slug: String!) {
	contentfulVille(slug: {eq: $slug}, node_locale: {eq: "en-US"}) {
		nomVille
		slug
				equivalentUrl
		description {
					childMarkdownRemark {
				html
			}
		}
		histoire {
					childMarkdownRemark {
				html
			}
		}
		nomDesCitoyens
		superficie
		population
		quantiteNouvHumains
		nomPaysParent
		slugPaysParent
		nomContinentParent
	}
}`