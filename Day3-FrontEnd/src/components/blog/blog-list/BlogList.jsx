import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/blogPosts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Row>
      {posts.map((post) => (
        <Col
          md={4}
          style={{
            marginBottom: 50
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
