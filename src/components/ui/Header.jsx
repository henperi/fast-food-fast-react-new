import React, { PureComponent, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link as ScrollTo, animateScroll as scroll } from 'react-scroll';
import { logoutUser } from '../../actions/userActions';
import FlashMessage from './FlashMsg';

export class Header extends PureComponent {
  handleLogout = (event) => {
    event.preventDefault();
    const { logoutUser: dispatchLogout, history, user } = this.props;
    dispatchLogout();
  };

  toggleNav = (event) => {
    event.preventDefault();
    return (
      event.target.parentElement.parentElement.classList.contains('topnav')
      && event.target.parentElement.parentElement.classList.toggle('responsive')
    );
  };

  render() {
    const { user, cart, flash } = this.props;
    // console.log(flash);
    const cartCount = cart.length;

    const IndexLinks = `${window.origin}/` === window.location.href && (
      <Fragment>
        <ScrollTo activeClass="active" to="about" spy smooth offset={-70} duration={500}>
          About Us
        </ScrollTo>
        <ScrollTo activeClass="active" to="contact" spy smooth offset={-70} duration={500}>
          Contact Us
        </ScrollTo>
      </Fragment>
    );

    const guestNav = (
      <div className="right-nav">
        <NavLink to="/users/foods" className="">
          Menu
        </NavLink>
        {IndexLinks}

        <NavLink to="/signin" className="">
          Signin
        </NavLink>
        <NavLink to="/signup">Signup</NavLink>
        <div className="dropdown">
          <NavLink activeClassName="active" to="/users/my-cart">
            <i className="fa fa-shopping-cart" />
            {' '}
            <span className="count cart-count">{cartCount}</span>
          </NavLink>
        </div>
        <a
          onClick={(e) => {
            this.toggleNav(e);
          }}
          href="/"
          className="icon"
        >
          &#9776;
        </a>
      </div>
    );
    const userNav = (
      <div className="right-nav">
        <NavLink to="/users/foods" activeClassName="active">
          Menu
        </NavLink>
        {IndexLinks}

        {/*        <NavLink to="/my-profile" className="">
          My Profile
        </NavLink> */}
        <div className="dropdown">
          <NavLink activeClassName="active" to="/users/my-cart">
            <i className="fa fa-shopping-cart" />
            {' '}
            <span className="count cart-count">{cartCount}</span>
          </NavLink>
          <NavLink to="/users/my-orders" activeClassName="active">
            My Orders
          </NavLink>
        </div>

        {/*
          <div className="dropdown-content">
          <NavLink to="/pending-orders">Pending Orders</NavLink>
          <NavLink to="/completed-orders">Completed Orders</NavLink>
          <NavLink to="/all-orders">All My Orders</NavLink>
          </div>
        */}
        <Link onClick={this.handleLogout} to="/signin" className="btn-rounded logout">
          Logout
        </Link>
        <a
          onClick={(e) => {
            this.toggleNav(e);
          }}
          href="/"
          className="icon"
        >
          &#9776;
        </a>
      </div>
    );
    const adminNav = (
      <div className="right-nav">
        <NavLink to="/admins/foods" className="active">
          Menu
        </NavLink>
        {IndexLinks}
        <div className="dropdown">
          <button type="button" className="dropbtn">
            Orders
            <i className="fa fa-caret-down" />
          </button>
          <div className="dropdown-content">
            <NavLink to="/admins/pending-orders">Pending Orders</NavLink>
            <NavLink to="/admins/completed-orders">Completed Orders</NavLink>
            <NavLink to="/admins/all-orders">All Orders</NavLink>
          </div>
        </div>
        <NavLink to="/admins/my-profile" className="">
          My Profile
        </NavLink>
        <a onClick={this.handleLogout} href="/" className="btn-rounded logout">
          Logout
        </a>
        <a
          onClick={(e) => {
            this.toggleNav(e);
          }}
          href="/"
          className="icon"
        >
          &#9776;
        </a>
      </div>
    );

    let nav = guestNav;
    if (user.isAuthenticated) {
      nav = user.role === 'admin' ? adminNav : userNav;
    }
    return (
      <header>
        <nav className="topnav" id="myTopnav">
          <div className="left-nav">
            <Link to="/" className="brand">
              Fast Food Fast
            </Link>
          </div>
          {nav}
          <FlashMessage flashData={flash} />
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
  flash: state.flash,
});

export default connect(
  mapStateToProps,
  { logoutUser },
)(Header);
