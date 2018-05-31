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
    Progress,
	TabContent,
	TabPane
} from 'reactstrap';
import classnames from 'classnames';

class Progression extends Component {
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
        } = this.props;

        return (
            <div>
                <Breadcrumb className="mb-0">
                    <BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Progression de l'Univers</BreadcrumbItem>
                </Breadcrumb>

                <div className="my-5">
					<Container>
						<h1 className="display-4">Progression de l'Univers</h1>
						<p className="lead">Voici la progression de toutes les histoires de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="histoires-pills">
							<NavLink className={ classnames({ active: this.state.activeTab === '1'})} onClick={() => { this.toggle('1'); }}>
								Histoires en cours
							</NavLink>
						</NavItem>
						<NavItem className="histoires-pills">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Histoires terminées
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
													edge.node.chapitreActuel < edge.node.maximumChapitre ?
														(
															<ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
																<ListGroupItemHeading><Link to={'/histoires/' + edge.node.slug}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
																<div className="list-group-item-text">
																	<Progress animated value={(edge.node.chapitreActuel / edge.node.maximumChapitre) * 100}>{edge.node.chapitreActuel + "/" + edge.node.maximumChapitre}</Progress>
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
													edge.node.chapitreActuel == edge.node.maximumChapitre ?
														(
															<ListGroupItem className="mb-4 border-top-0 border-right-0 border-left-0 pt-0 pr-0 pl-0">
																<ListGroupItemHeading><Link to={'/histoires/' + edge.node.slug}>{edge.node.titreRoman}</Link></ListGroupItemHeading>
																<div className="list-group-item-text">
																	<Progress animated value={(edge.node.chapitreActuel / edge.node.maximumChapitre) * 100}>{edge.node.chapitreActuel + "/" + edge.node.maximumChapitre}</Progress>
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

Progression.propTypes = {
    data: PropTypes.object.isRequired
}

export default Progression

export const pageQuery = graphql
    `query listeHistoireQueryFR2 {
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
              chapitreActuel
              maximumChapitre
            }
          }
        }
      }`