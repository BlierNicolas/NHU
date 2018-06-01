import React from 'react'
import Link from 'gatsby-link'
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
    Button
} from 'reactstrap';

const Footer = ({ siteTitle }) => (
    <footer className="py-3">
        <Container fluid>
            <Row>
                <Col sm="12" lg="9">
                    <div className="text-white">
                        <Row className="pt-3">
                            <Col sm="12" lg={{ size: 10, offset: 1 }} className="text-center">
                                <a href="https://www.gatsbyjs.org/" rel="nofollow" target="_blank" className="mx-3">Gatsby</a>
                                <a href="https://www.contentful.com/" rel="nofollow" target="_blank" className="mx-3">
                                    <img src="https://images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" className="contentful-logo" alt="Powered by Contentful" />
                                </a>
                                <a href="https://www.netlify.com/" rel="nofollow" target="_blank" className="mx-3">Netlify</a>
                            </Col>
                        </Row>


                    </div>
                </Col>
                <Col sm="12" lg="3 display-copy">
                    <div className="">
                        <p className="text-right text-white mb-0">Venatus Universe ©{new Date().getFullYear()}</p>
                    </div>
                </Col>
            </Row>

        </Container>
    </footer>
)

export default Footer