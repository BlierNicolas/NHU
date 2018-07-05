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
                    { name: 'msapplication-TileColor', content: '#da532c' },
                    { name: 'theme-color', content: '#007bff' },
                ]}
                link={[
                    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
                    { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
                    { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
                    { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
                    { rel: "manifest", href: "/site.webmanifest" },
                    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
                ]}
            />
            <div id="wrapper">
                <div>
                    <div>
                        {children()}
                    </div>
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