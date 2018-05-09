import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/header'
import Footer from '../components/footer'
import '../startbootstrap-sb-admin-2-gh-pages/vendor/bootstrap/css/bootstrap.min.css'
import '../startbootstrap-sb-admin-2-gh-pages/vendor/metisMenu/metisMenu.min.css'
import '../startbootstrap-sb-admin-2-gh-pages/dist/css/sb-admin-2.css'
import '../startbootstrap-sb-admin-2-gh-pages/vendor/morrisjs/morris.css'
import '../startbootstrap-sb-admin-2-gh-pages/vendor/font-awesome/css/font-awesome.min.css'
import '../../../css/style.css'

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
			<Header siteTitle={data.site.siteMetadata.title} />
			<div>
			  {children()}
			</div>
			<Footer siteTitle={data.site.siteMetadata.title} />
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
