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

class IndexPageEn extends Component {
    constructor() {
        super();
        this.state = {
            currentItem: '',
            username: ''
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
                <HeaderEn />

                {/* <div className="equiv">
                    <Button className="float-right" color="primary"><Link className="text-white" to="/">Fr</Link></Button>
                </div> */}

                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">New Humans Universe</h1>
                        <p className="lead">New Human Universe is a fictive universe where 0.01% of the population have a power.</p>
                        <p className="lead">The powers are detectable via a gene that has been named the Drumel gene, on behalf of the scientist who identified the different cases and possibilities of this gene.</p>
                        <Link className="btn btn-primary" to="/en/stories">Enter in the Universe</Link>
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
                            <h2 className="mb-4">Recents news</h2>
                            {
                                data.allContentfulNouvelle.edges.map(
                                    (edge) =>
                                        <div className="clearfix border-bottom mb-2" key={edge.node.id}>
                                            <div className="">
                                                <Row className="no-gutters">
                                                    <Col md="9" sm="12">
                                                        <Link to={'en/news/' + edge.node.slug}><h3 className="float-left"><small>{edge.node.titreNouvelle}</small></h3></Link>
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
                                                        <Link className="float-right mb-2" to={'en/news/' + edge.node.slug}>See more</Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                )
                            }
                            <br />
                            <h2 className="mb-4">Calendar of the next releases</h2>
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
                                                            {
																	edge.node.romanSlug ?
																		(<Link className="float-right mb-2" to={"/en" + edge.node.romanSlug}>Go see the story</Link>) :
																		('')
																}
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
  }`