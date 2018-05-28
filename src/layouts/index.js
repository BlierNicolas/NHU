import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/header'
import Footer from '../components/footer'
import '../../css/style.css'

const Layout = ({ children, data }) => (
    <div>
        <div>
            <Helmet
                htmlAttributes={{ lang: "fr" }}
                title="L'Univers des Nouveaux Humains"
                meta={[
                    { name: 'description', content: 'L\'Univers des Nouveaux Humains' },
                ]}
            />
            <div id="wrapper">
                <div id="page-wrapper">
                    <Header />
                    <div>
                        {children()}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    </div>
)

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`