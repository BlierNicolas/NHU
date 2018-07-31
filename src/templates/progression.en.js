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
import classnames from 'classnames';
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'
import List_Story_Progression from '../components/list_story_progression.en';

class ProgressionEN extends Component {
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
				<HeaderEn />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/en">Homepage</Link></BreadcrumbItem>
						<BreadcrumbItem active>Progression of the Universe</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/progression"><Button className="float-right" color="primary">Fr</Button></Link>
				</div>

				<div className="my-5">
					<Container>
						<h1 className="display-4">Progression of the Universe</h1>
						<p className="lead">This is the progression of all the stories in the New Human Universe.</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="histoires-pills">
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
								Stories in progress
							</NavLink>
						</NavItem>
						<NavItem className="histoires-pills">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Finished stories
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
															<List_Story_Progression histoire_progression={edge.node} />
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
															<List_Story_Progression histoire_progression={edge.node} />
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

				<FooterEn />
			</div>
		)
	}
}

ProgressionEN.propTypes = {
	data: PropTypes.object.isRequired
}

export default ProgressionEN

export const pageQuery = graphql
	`query listeHistoireQueryEN2 {
        allContentfulRoman(sort: {fields: [typeHistoire, titreRoman], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
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