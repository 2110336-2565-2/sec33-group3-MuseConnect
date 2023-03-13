"use client";
import React, { useEffect, useState } from "react";
import { Button, Stack,Nav, Form} from 'react-bootstrap' ;
import "bootstrap/dist/css/bootstrap.min.css";

export default function page() {
  const [musicians, setMusicians] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // get all musician with filter condition
    const getMusicians = async () => {
      const queryParams = new URLSearchParams({
        p: 0,
        m: 7,
        ...data
      }).toString();
      console.log(queryParams);
      const respone = await fetch(
        "http://localhost:4000/api/musician?" + queryParams,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await respone.json();
      if (!respone.ok) {
        alert(result.error);
      } else {
        setMusicians(result.result);
      }
    };

    if (isFilter) {
      console.log(data);
      getMusicians();
    }
    setIsFilter(false);
  }, [isFilter]);

  return (
    <div>

    <Nav>
    <Form className="d-flex" name="my-form" action="" method="post">
            <Form.Control
              name="name"
              type="search"
              placeholder="name"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={() => setIsFilter(true)} variant="outline-success">Filter</Button>
            <Button onClick={() => setData({name: "asd"})} variant="outline-success">name</Button>
            <Button onClick={() => setData({})} variant="outline-success">"{}"</Button>
          </Form>
    </Nav>







    
      {musicians &&
        musicians.map((musician) => {
          console.log(musician);
          return `${musician.first_name} ${musician.last_name}`;
        })}
    </div>
  );
}
