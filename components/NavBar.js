import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>📚 Simply Books 📚</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="ml-auto">
            <Link passHref href="/">
              <Nav.Link>Books</Nav.Link>
            </Link>
            <Link passHref href="/book/new">
              <Nav.Link>Create Book</Nav.Link>
            </Link>
            <Link passHref href="/authors/authors">
              <Nav.Link>Authors</Nav.Link>
            </Link>
            <Link passHref href="/authors/new">
              <Nav.Link>Create Author</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <button type="button" className="btn btn-danger" onClick={() => { signOut(); }}>Sign Out</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

NavBar.defaultProps = {
  user: null,
};
