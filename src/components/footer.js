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
    <footer>
        <div className="p-3">
            <p className="text-right text-white mb-0">Venatus Universe ©{new Date().getFullYear()}</p>
        </div>
    </footer>
)

export default Footer