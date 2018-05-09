import React from 'react'
import Link from 'gatsby-link'

const Header = ({ siteTitle }) => (
  <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
    <div className="navbar-header">
        <a className="navbar-brand" href="https://venatusuniverse.com/index.html">New Human Universe</a>
    </div>
    <ul className="nav navbar-top-links navbar-right">
        <li><Link to="#">Nouvelles</Link></li>
        <li className="dropdown">
			<Link className="dropdown-toggle" data-toggle="dropdown" to="#">Histoires </Link>
            <ul className="dropdown-menu dropdown-histoires">
                <li>
					<Link to="/ListeDesRomans">Les romans</Link>
                </li>
                <li>
					<Link to="#">Calendrier des sorties</Link>
                </li>
            </ul>
        </li>
        <li className="dropdown">
            <Link className="dropdown-toggle" data-toggle="dropdown" to="#">Infos </Link>
            <ul className="dropdown-menu dropdown-infos">
                <li>
                    <a href="https://venatusuniverse.com/ListeDesPersonnages">
                        Les personnages
                    </a>
                </li>
                <li>
					<Link to="#">Les pouvoirs</Link>
                </li>
                <li>
                    <Link to="#">Les groupes</Link>
                </li>
                <li>
					<Link to="#">La géographie</Link>
                </li>
                <li>
					<Link to="#">Les théories</Link>
                </li>
            </ul>
        </li>
    </ul>
</nav>
)

export default Header
