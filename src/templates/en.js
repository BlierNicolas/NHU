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
import HeaderEn from '../components/enHeader'
import FooterEn from '../components/enFooter'
import Block_News from '../components/block_news.en';
import Block_Calendar from '../components/block_calendar.en';
import Block_Continuer from '../components/block_continuer';
//import firebase from '../firebase.js';
import cookie from 'react-cookies';

class IndexPageEn extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            connectedUser: 'Nico',
            lecteur: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                <HeaderEn />

                <div className="equiv">
                    <Link className="text-white" to="/"><Button className="float-right" color="primary">Fr</Button></Link>
                </div>

                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">New Humans Universe</h1>
                        <p className="lead">New Human Universe is a fictive universe where 0.01% of the population have a power.</p>
                        <p className="lead">The powers are detectable via a gene that has been named the Drumel gene, on behalf of the scientist who identified the different cases and possibilities of this gene.</p>
                        <Link className="btn btn-primary" to="/en/stories">Enter in the Universe</Link>
                    </Container>
                </Jumbotron>

                {/* {
                    this.state.lecteur != "null" ?
                        (<Container fluid className="p-0">
                            <Row className="pb-5">
                                <Col sm="12">
                                    <h2 className="mb-4">Continue to read</h2>
                                    <Block_Continuer allChapitre={data.allContentfulChapitre} />
                                </Col>
                            </Row>
                        </Container>) :
                        ('')
                } */}

                <Container fluid className="p-0">
                    <Row className="pb-5">
                        <Col sm="12" lg="8" >
                            <h2 className="mb-4">Recents news</h2>
                            <Block_News allNouvelles={data.allContentfulNouvelle} />
                        </Col>
                        <Col sm="12" lg="4" >
                            <h2 className="mb-4">Upcoming releases</h2>
                            <Block_Calendar allCalendrier={data.allContentfulCalendrier} />
                        </Col>
                    </Row>
                    <Row className="pb-5">
                        <Col>
                            <h2 className="mb-4">Creation of the Universe</h2>
                            <p>I started creating the Universe around January 2015, the first story I wrote was <a href="/en/stories/the-first-cyborg-volume-1">The First Cyborg</a>, after the first volume, I started writing a sequel.</p>
                            <p>Soon, the Universe expanded, leading to the creation of several characters, powers and groups. The concepts were detailed as time went on.</p>
                            <p>Eventually, all the characters will have their stories to tell and the Universe will continue to grow again and again.</p>
                        </Col>
                    </Row>
                </Container>

                <FooterEn />
            </div>
        )
    }
}

IndexPageEn.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPageEn

export const pageQuery = graphql`query listeNouvelleQueryEN {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
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
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "en-US"}}) {
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
	allContentfulChapitre(sort: {fields: [nomRoman, ordre], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
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