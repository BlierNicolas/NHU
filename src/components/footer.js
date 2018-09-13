import React from 'react'
import Link from 'gatsby-link'
import {
    Container,
    Row,
    Col,
    Alert
} from 'reactstrap';
import lang_fr from '../langues/lang_fr.json';
import lang_en from '../langues/lang_en.json';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.lang = lang_fr;

        if (this.props.lang === "fr-CA") {
            this.lang = lang_fr;
        }
        if (this.props.lang === "en-US") {
            this.lang = lang_en;
        }
    }

    render() {
        return (
            <footer>
                <Alert color="primary">
                    {this.lang.footer_alert_text}<a href={this.lang.footer_alert_url} target="_blank" rel="noopener noreferrer">{this.lang.accueil_jumbo_titre}</a>
                </Alert>
                <div className="py-5">
                    <Container fluid>
                        <Row>
                            <Col sm="12" className="text-white d-flex flex-column flex-lg-row align-items-center justify-content-between text-center">
                                <a href="https://www.contentful.com/" rel="nofollow noopener noreferrer" target="_blank" className="mx-3 text-white">
                                    <img src="https://images.ctfassets.net/fo9twyrwpveg/7F5pMEOhJ6Y2WukCa2cYws/398e290725ef2d3b3f0f5a73ae8401d6/PoweredByContentful_DarkBackground.svg" className="contentful-logo" alt="Powered by Contentful" />
                                </a>

                                <div className="my-3 my-lg-0">
                                    <Link to={this.lang.header_contributeurs_url + "/"} className="text-white nav-link d-inline">{this.lang.header_contributeurs}</Link>
                                    <Link to={this.lang.header_nombre_url + "/"} className="text-white nav-link d-inline">{this.lang.header_nombre}</Link>
                                </div>

                                <p className="text-right text-white mb-0"><small>Venatus Universe ©{new Date().getFullYear()}</small></p>

                                {/* <a href="https://www.gatsbyjs.org/" rel="nofollow" target="_blank" className="mx-3 text-white">Gatsby</a>
                    <a href="https://www.netlify.com/" rel="nofollow" target="_blank" className="mx-3 text-white">Netlify</a> */}
                            </Col>
                        </Row>

                    </Container>
                </div>
            </footer>
        );
    }
}