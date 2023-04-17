"use client";

import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
// import StarRating from './StarRating';
import "./ReviewModal.css";

export default function ReviewModal(props) {
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    let userToken = props.storedUser.token;
    if (userToken != null) {
      fetch(`http://localhost:4000/api/event/${props.eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to get review");
          }
          return response.json();
        })
        .then((data) => {
          setDescription(data.review_description);
          setScore(data.review_score);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [props.storedUser, props.eventId]);

  const handleRatingChange = (ratingValue) => {
    setScore(ratingValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userToken = props.storedUser.token;

    fetch(`http://localhost:4000/api/event/${props.eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        review_description: description,
        review_score: score,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to change review");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
    props.onHide();
  }

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="modal-title">Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="score">
            <Form.Label id="modal-score">Score [0 - 5]</Form.Label>
            {/* <StarRating onRatingChange={handleRatingChange} />
            <Form.Text className="text-muted">
              Score: {score}
            </Form.Text> */}
            <Form.Control
              type="number"
              min={0}
              max={5}
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            {/* <Form.Control
              as={StarRating}
              onRatingChange={handleScoreChange}
            /> */}
          </Form.Group>
          <Form.Group className="mt-2" controlId="description">
            <Form.Label id="modal-description">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: "auto" }}
            />
          </Form.Group>

          <Button className="mt-2" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
