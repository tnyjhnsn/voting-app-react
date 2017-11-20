import React from 'react'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const renderLogin = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/account/login">Log In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register">Register</NavLink>
    </NavItem>
  </Nav>
)

export default class Header extends React.Component {
  constructor(props) {
    super(props)

    this.logOutClick = this.logOutClick.bind(this)
    this.renderGreeting = this.renderGreeting.bind(this)
    this.toggleNavBar = this.toggleNavBar.bind(this)

    this.state = {
      isOpen: false
    }
  }

  logOutClick(e) {
    e.preventDefault()
    this.props.logUserOut()
  }

  toggleNavBar() {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      }
    })
  }

  renderGreeting() {
    const style = { cursor: 'pointer', color: '#8f9598' }
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <a style={style} onClick={this.logOutClick}>Log Out</a>
        </NavItem>
      </Nav>
    )
  }

  render() {
    const { isLoggedIn } = this.props.auth
    const style = { backgroundColor: '#263238' }
    return (
      <header className="wrapper">
        <Navbar style={style} className="navbar-dark navbar-expand-md">
          <NavbarBrand tag={Link} to="/">Pollster</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            {isLoggedIn ? this.renderGreeting() : renderLogin()}
          </Collapse>
        </Navbar>
      </header>
    )
  }
}
