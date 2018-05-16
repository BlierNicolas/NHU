import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/header'
import Footer from '../components/footer'
import '../../css/style.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title="New Human Universe"
      meta={[
        { name: 'description', content: 'Sample' },
      ]}
    />
    <div id="wrapper">
		<div id="page-wrapper">
			<Header/>
			<div>
			  {children()}
			</div>
			<Footer/>
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
