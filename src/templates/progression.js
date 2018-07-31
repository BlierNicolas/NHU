import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Nav,
	NavItem,
	NavLink,
	Container,
	ListGroup,
	ListGroupItem,
	ListGroupItemHeading,
	Breadcrumb,
	BreadcrumbItem,
	Progress,
	TabContent,
	TabPane,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';
import List_Histoire_Progression from '../components/list_histoire_progression';

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
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem active>Progression de l'Univers</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/en/progression"><Button className="float-right" color="primary">En</Button></Link>
				</div>

				<div className="my-5">
					<Container>
						<h1 className="display-4">Progression de l'Univers</h1>
						<p className="lead">Voici la progression de toutes les histoires de l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="histoires-pills">
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
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
															<List_Histoire_Progression histoire_progression={edge.node} />
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
															<List_Histoire_Progression histoire_progression={edge.node} />
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

				<Footer />
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