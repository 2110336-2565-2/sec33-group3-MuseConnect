'use client'

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Dropdown,Popover} from 'react-bootstrap';

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Body>
  </Popover>
);

export default function page() {
  return (
    <div>
      <Form className="d-flex" style={{marginTop: "2rem", marginLeft: "3rem"}} >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{width: "20%"}}
            />
            <Button variant="outline-success">Search</Button>
            <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </Form>
    </div>
  )
}
