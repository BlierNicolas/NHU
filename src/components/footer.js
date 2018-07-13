import React from 'react'
import Link from 'gatsby-link'
import {
    Container,
    Row,
    Col,
    Alert
} from 'reactstrap';

const Footer = ({ siteTitle }) => (
    <footer>
        <Alert color="primary">
            Venez liker notre page Facebook: <a href="https://www.facebook.com/CreateurDesNouveauxHumains" target="_blank">L'Univers des Nouveaux Humains</a>
        </Alert>
        <div className="py-5">
            <Container fluid>
                <Row>
                    <Col sm="12" className="text-white d-flex flex-column flex-lg-row align-items-center justify-content-between text-center">
                        <a href="https://www.contentful.com/" rel="nofollow" target="_blank" className="mx-3 text-white">
                            <img src="https://images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" className="contentful-logo" alt="Powered by Contentful" />
                        </a>

                        <div className="my-3 my-lg-0">
                            <Link to="/contributeurs" className="text-white nav-link d-inline">Contributeurs</Link>
                            <Link to="/nombre" className="text-white nav-link d-inline">L'Univers en nombre</Link>
                        </div>

                        <p className="text-right text-white mb-0"><small>Venatus Universe ©{new Date().getFullYear()}</small></p>

                        {/* <a href="https://www.gatsbyjs.org/" rel="nofollow" target="_blank" className="mx-3 text-white">Gatsby</a>
                    <a href="https://www.netlify.com/" rel="nofollow" target="_blank" className="mx-3 text-white">Netlify</a> */}
                    </Col>
                </Row>

            </Container>
        </div>
    </footer>
)

export default Footer