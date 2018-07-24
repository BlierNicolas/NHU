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
	TabContent,
	TabPane,
	Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import classnames from 'classnames';
import List_Histoire_Info from '../components/list_histoire_info';

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
			<div id="page-wrapper">
				<Header />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to="/">Accueil</Link></BreadcrumbItem>
						<BreadcrumbItem active>Nos Histoires de l'Univers...</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to="/en/stories"><Button className="float-right" color="primary">En</Button></Link>
				</div>

				<div className="my-5">
					<Container>
						<h1 className="display-4">Nos Histoires de l'Univers...</h1>
						<p className="lead">Voici tous les romans et mini-histoires qui se rapportent à l'Univers des Nouveaux Humains.</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
								Les romans
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								Les mini-histoires
							</NavLink>
						</NavItem>
					</Nav>
					<br />
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ListGroup>
								<List_Histoire_Info allHistoires={data.allContentfulRoman} typeHistoire="Roman" />
							</ListGroup>
						</TabPane>
						<TabPane tabId="2">
							<ListGroup>
								<List_Histoire_Info allHistoires={data.allContentfulRoman} typeHistoire="Mini-histoire" />
							</ListGroup>
						</TabPane>
					</TabContent>
				</Container>

				<Footer />
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