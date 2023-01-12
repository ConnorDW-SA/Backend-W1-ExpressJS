import React, { useState } from "react";
import { Button, Container, Navbar, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const NavBar = (props) => {
  const [authorSearch, setAuthorSearch] = useState("");
  const [titleSearch, setTitleSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setAuthorSearch(event.target.elements.authorSearch.value);
    setTitleSearch(event.target.elements.titleSearch.value);
  };

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src="logo.svg" />
        </Navbar.Brand>

        <Button
          as={Link}
          to="/new"
          className="blog-navbar-add-button bg-dark"
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Post Article
        </Button>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Search for author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="authorSearch"
              value={authorSearch}
              onChange={(event) => setAuthorSearch(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Search for Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              name="titleSearch"
              value={titleSearch}
              onChange={(event) => setTitleSearch(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;
