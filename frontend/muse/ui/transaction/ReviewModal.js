"use client";

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ReviewModal(props) {
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);

  /* TODO implement review submit logic */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit modal");
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="score">
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={5}
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
