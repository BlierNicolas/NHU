import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';

class IndexPage extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            connectedUser: 'Nico'
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }

    // handleSubmit(e) {
    //     // Empêche le refresh
    //     e.preventDefault();

    //     // Met la référence vers la database
    //     const itemsRef = firebase.database().ref('items');

    //     // Popule les champs dans une collection "item"
    //     const item = {
    //         title: this.state.currentItem,
    //         user: this.state.username
    //     }

    //     // Pousse l'item créé dans la collection
    //     itemsRef.push(item);

    //     // Remet les champs vides
    //     this.setState({
    //         currentItem: '',
    //         username: ''
    //     });
    // }

    // componentDidMount() {
    //     const itemsRef = firebase.database().ref('items');
    //     itemsRef.on('value', (snapshot) => {
    //         let items = snapshot.val();
    //         let newState = [];
    //         for (let item in items) {
    //             newState.push({
    //                 id: item,
    //                 title: items[item].title,
    //                 user: items[item].user
    //             });
    //         }
    //         this.setState({
    //             items: newState
    //         });
    //     });
    // }

    // removeItem(itemId) {
    //     const itemRef = firebase.database().ref(`/items/${itemId}`);
    //     itemRef.remove();
    // }

    render() {
        const {
            data
        } = this.props

        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">L'Univers des Nouveaux Humains</h1>
                        <p className="lead">L'Univers des Nouveaux Humains est un Univers fictif où 0.01% de la population mondiale possède des pouvoirs.</p>
                        <p className="lead">Les pouvoirs sont détectables via un gène qui a été nommé le gène Drumel, au nom du scientifique qui a identifié les différents cas et possibilités de ce gène.</p>
                        <Link className="btn btn-primary" to="/histoires">Entrer dans l'Univers</Link>
                    </Container>
                </Jumbotron>

                <Container fluid className="p-0">
                    <Row className="pb-5">
                        {/* <Col sm="12" lg="9">
                            <h2>Test firebase</h2>
                            <div className='container'>
                                <section className='add-item'>
                                    <form onSubmit={this.handleSubmit}>
                                        <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                                        <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
                                        <button>Add Item</button>
                                    </form>
                                </section>
                                <section className='display-item'>
                                    <div className="wrapper">
                                        <ul>
                                            {this.state.items.map((item) => {
                                                if (item.user == this.state.connectedUser) {
                                                    return (
                                                        <li key={item.id}>
                                                            <h3>{item.title}</h3>
                                                            <p>brought by: {item.user}</p>
                                                            <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                                                        </li>
                                                    )
                                                };
                                            })}
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        </Col> */}
                        <Col sm="12" lg="9" >
                            <h2 className="mb-4">Dernières nouvelles</h2>
                            {
                                data.allContentfulNouvelle.edges.map(
                                    (edge) =>
                                        <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            <div className="">
                                                <Row className="no-gutters">
                                                    <Col md="9" sm="12">
                                                        <Link to={'nouvelles/' + edge.node.slug}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
                                                    </Col>

                                                    <Col md="3" sm="12">
                                                        <span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div>
                                                <Row className="no-gutters">
                                                    <Col md="9" sm="12">
                                                        <div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
                                                    </Col>

                                                    <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                        <Link className="float-right mb-2" to={'nouvelles/' + edge.node.slug}>En savoir plus</Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                )
                            }
                            <br />
                            <h2 className="mb-4">Calendrier des prochaines sorties</h2>
                            {
                                data.allContentfulCalendrier.edges.map(
                                    (edge) =>
                                        <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            {edge.node.affiche ?
                                                (<div>
                                                    <div className="">
                                                        <Row className="no-gutters">
                                                            <Col md="9" sm="12">
                                                                <h3 className="float-left"><small>{edge.node.titre}</small></h3>
                                                            </Col>

                                                            <Col md="3" sm="12">
                                                                <span className="float-right"><small>{edge.node.dateSpe} / {edge.node.date}</small></span>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div>
                                                        <Row className="no-gutters">
                                                            <Col md="9" sm="12">
                                                                <div dangerouslySetInnerHTML={{ __html: edge.node.description.childMarkdownRemark.html }} />
                                                            </Col>

                                                            <Col md="3" sm="12" className="d-flex justify-content-end align-items-end">
                                                                <Link className="float-right mb-2" to={edge.node.romanSlug}>Aller voir l'histoire</Link>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>) :
                                                ('')
                                            }
                                        </div>
                                )
                            }
                        </Col>
                        <Col sm="12" lg="3" >
                            {/* <aside className="">
                        <h2 className="mb-4">Le Nic</h2>

                        <p>
                            lorem  
                        </p>
                    </aside> */}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

IndexPage.propTypes = {
    data: PropTypes.object.isRequired
}

export default IndexPage

export const pageQuery = graphql`query listeNouvelleQueryFR {
    allContentfulNouvelle (limit: 9, sort: {fields: [date], order: DESC}, filter: {node_locale: {eq: "fr-CA"}}) {
      edges {
        node {
          id
          titreNouvelle
          description {
            childMarkdownRemark {
              html
            }
          }
          date(formatString: "YYYY MMMM DD")
          dateSpe
          slug
        }
      }
    }
    allContentfulCalendrier (limit: 6, sort: {fields: [date], order: ASC}, filter: {node_locale: {eq: "fr-CA"}}) {
		edges {
			node {
				id
				titre
				description {
					childMarkdownRemark {
						html
					}
				}
				date(formatString: "YYYY MMMM DD")
                dateSpe
                romanSlug
                affiche
			}
		}
	}
  }`