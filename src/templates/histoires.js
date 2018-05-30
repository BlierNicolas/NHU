import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Container,
	Row,
	Col,
	Jumbotron,
	Button,
	Card,
	CardDeck,
	CardHeader,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	ListGroupItemText,
	Breadcrumb,
	BreadcrumbItem,
	TabContent,
	TabPane
} from 'reactstrap';
import classnames from 'classnames';

class ListeDesHistoires extends Component {
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
			<div>
				<Breadcrumb>
					<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
					<BreadcrumbItem active>Nos Histoires de l'Univers...</BreadcrumbItem>
				</Breadcrumb>

				<div className="my-5">
					<Container>
						<h1 className="display-4">Nos Histoires de l'Univers...</h1>
						<p className="lead">Voici tous les romans et mini-histoires qui se rapportent à l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="histoires-pills">
							<NavLink className={ classnames({ active: this.state.activeTab === '1'})} onClick={() => { this.toggle('1'); }}>
								Les romans
							</NavLink>
						</NavItem>
						<NavItem className="histoires-pills">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Les mini-histoires
							</NavLink>
						</NavItem>
					</Nav>
					<br />
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ListGroup>
								{
									data.allContentfulRoman.edges.map(
										(edge) =>
											<div key={edge.node.id}>
												{
													edge.node.typeHistoire == "Roman" ?
														(
															<ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
																<ListGroupItemHeading><Link to={'/histoires/' + edge.node.slug}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
																<div className="list-group-item-text">
																	<div className="text-justify" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
																	<Link to={'/histoires/' + edge.node.slug}>Commencer à lire</Link>
																</div>
															</ListGroupItem>
														) :
														('')
												}
											</div>
									)
								}
							</ListGroup>
						</TabPane>
						<TabPane tabId="2">
							<ListGroup>
								{
									data.allContentfulRoman.edges.map(
										(edge) =>
											<div key={edge.node.id}>
												{
													edge.node.typeHistoire == "Mini-histoire" ?
														(
															<ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
																<ListGroupItemHeading><Link to={'/histoires/' + edge.node.slug}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
																<div className="list-group-item-text">
																	<div className="text-justify" dangerouslySetInnerHTML={{ __html: edge.node.resume.childMarkdownRemark.html }} />
																	<Link to={'/histoires/' + edge.node.slug}>Commencer à lire</Link>
																</div>
															</ListGroupItem>
														) :
														('')
												}
											</div>
									)
								}
							</ListGroup>
						</TabPane>
					</TabContent>
				</Container>
			</div>
		)
	}
}

ListeDesHistoires.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesHistoires

export const pageQuery = graphql`query listeHistoireQueryFR {
    allContentfulRoman(sort: {fields: [typeHistoire, titreRoman], order: DESC}, filter: {node_locale: {eq: "fr-CA"}}) {
      edges {
        node {
			id
          titreRoman
		  typeHistoire
		  resume {
			childMarkdownRemark {
			  html
			}
		  }
          slug
        }
      }
    }
  }`