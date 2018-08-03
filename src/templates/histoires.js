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
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class ListeDesHistoires extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			activeTab: '1',
		};

        this.lang = lang_fr;

        if (this.props.pathContext.lang == "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.pathContext.lang == "en-US") {
            this.lang = lang_en;
        }
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
				<Header lang={this.props.pathContext.lang} />

				<div>
					<Breadcrumb className="mb-0">
						<BreadcrumbItem><Link to={this.lang.header_accueil_url}>{this.lang.header_accueil}</Link></BreadcrumbItem>
						<BreadcrumbItem active>{this.lang.header_histoires}</BreadcrumbItem>
					</Breadcrumb>
				</div>

				<div className="equiv">
					<Link className="text-white" to={this.lang.equi_histoires}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
				</div>

				<div className="my-5">
					<Container>
						<h1 className="display-4">{this.lang.header_histoires}</h1>
						<p className="lead">{this.lang.histoires_intro_text}</p>
					</Container>
				</div>

				<Container className="my-5">
					<Nav pills>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
								{this.lang.type_roman_text}
							</NavLink>
						</NavItem>
						<NavItem className="cursor-update">
							<NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
								{this.lang.type_mini_histoire_text}
							</NavLink>
						</NavItem>
					</Nav>
					<br />
					<TabContent activeTab={this.state.activeTab}>
						<TabPane tabId="1">
							<ListGroup>
								<List_Histoire_Info allHistoires={data.allContentfulRoman} typeHistoire="Roman" lang={this.props.pathContext.lang} />
							</ListGroup>
						</TabPane>
						<TabPane tabId="2">
							<ListGroup>
								<List_Histoire_Info allHistoires={data.allContentfulRoman} typeHistoire="Mini-histoire" lang={this.props.pathContext.lang} />
							</ListGroup>
						</TabPane>
					</TabContent>
				</Container>

				<Footer lang={this.props.pathContext.lang} />
			</div>
		)
	}
}

ListeDesHistoires.propTypes = {
	data: PropTypes.object.isRequired
}

export default ListeDesHistoires

export const pageQuery = graphql`query listeHistoireQueryFR ($lang: String!) {
    allContentfulRoman(sort: {fields: [typeHistoire, titreRoman], order: DESC}, filter: {node_locale: {eq: $lang}}) {
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