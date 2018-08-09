import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';
import Header from '../components/header'
import Footer from '../components/footer'
import Block_Nouvelles from '../components/block_nouvelles';
import Block_Calendrier from '../components/block_calendrier';
import Block_Continuer from '../components/block_continuer';
//import firebase from '../firebase.js';
import cookie from 'react-cookies';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            connectedUser: 'Nico',
            lecteur: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.lang = lang_fr;

        if (this.props.pathContext.lang == "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.pathContext.lang == "en-US") {
            this.lang = lang_en;
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        // // Empêche le refresh
        // e.preventDefault();

        // // Met la référence vers la database
        // const itemsRef = firebase.database().ref('items');

        // // Popule les champs dans une collection "item"
        // const item = {
        //     title: this.state.currentItem,
        //     user: this.state.username
        // }

        // // Pousse l'item créé dans la collection
        // itemsRef.push(item);

        // // Remet les champs vides
        // this.setState({
        //     currentItem: '',
        //     username: ''
        // });
    }

    componentDidMount() {
        // const itemsRef = firebase.database().ref('items');
        // itemsRef.on('value', (snapshot) => {
        //     let items = snapshot.val();
        //     let newState = [];
        //     for (let item in items) {
        //         newState.push({
        //             id: item,
        //             title: items[item].title,
        //             user: items[item].user
        //         });
        //     }
        //     this.setState({
        //         items: newState
        //     });
        // });
    }

    componentWillMount() {
        this.state.lecteur = cookie.load('lecteur');
    }

    removeItem(itemId) {
        // const itemRef = firebase.database().ref(`/items/${itemId}`);
        // itemRef.remove();
    }

    render() {
        const {
            data
        } = this.props

        return (
            <div>
                <Header lang={this.props.pathContext.lang} />

                <div className="equiv">
                    <Link className="text-white" to={this.lang.other_lang_url}><Button className="float-right" color="primary">{this.lang.other_lang_label}</Button></Link>
                </div>

                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">{this.lang.accueil_jumbo_titre}</h1>
                        <p className="lead">{this.lang.accueil_jumbo_parag_1}</p>
                        <p className="lead">{this.lang.accueil_jumbo_parag_2}</p>
                        <Link className="btn btn-primary" to={this.lang.header_histoires_url}>{this.lang.accueil_jumbo_btn_titre}</Link>
                    </Container>
                </Jumbotron>

                {/* {
                    this.state.lecteur != "null" ?
                        (<Container fluid className="p-0">
                            <Row className="pb-5">
                                <Col sm="12">
                                    <h2 className="mb-4">Continuer à lire</h2>
                                    <Block_Continuer allChapitre={data.allContentfulChapitre} />
                                </Col>
                            </Row>
                        </Container>) :
                        ('')
                } */}

                <Container fluid className="p-0">
                    <Row className="pb-5">
                        <Col sm="12" lg="8" >
                            <h2 className="mb-4">{this.lang.nouvelles_titre}</h2>
                            <Block_Nouvelles allNouvelles={data.allContentfulNouvelle} lang={this.props.pathContext.lang} />
                        </Col>
                        <Col sm="12" lg="4" >
                            <h2 className="mb-4">{this.lang.calendrier_titre}</h2>
                            <Block_Calendrier allCalendrier={data.allContentfulCalendrier} lang={this.props.pathContext.lang} />
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h2 className="mb-4">{this.lang.block_info_titre}</h2>
                            <p>{this.lang.block_info_parag_1_1}<a href={this.lang.block_info_parag_1_url}>{this.lang.block_info_parag_1_name}</a>{this.lang.block_info_parag_1_2}</p>
                            <p>{this.lang.block_info_parag_2}</p>
                            <p>{this.lang.block_info_parag_3}</p>
                        </Col>
                    </Row>
                </Container>

                <Footer lang={this.props.pathContext.lang} />
            </div >
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`query listeNouvelleQueryFR ($lang: String!) {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: $lang}}) {
      edges {
        node {
          id
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY-MM-DD")
          dateSpe
          slug
        }
      }
    }
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: $lang}}) {
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
	allContentfulChapitre(sort: {fields: [nomRoman, ordre], order: ASC}, filter: {node_locale: {eq: $lang}}) {
	  edges {
		node {
		  id
		  titreChapitre
		  nomRoman
		  chapitreApres
		  slug
		}
	  }
	}
  }`