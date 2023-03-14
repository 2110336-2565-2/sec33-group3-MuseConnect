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

  const filterHandler = (e) => {
    e.preventDefault(); // prevent form submission
  }
  const [nameFilter, setnameFilter] = useState("");
  const [specialFilter, setspecialFilter] = useState([]);

  return (
    <div>

    <Nav>
    <Form.Group className="d-flex" onSubmit={filterHandler}>
            <Form.Control
              name="name"
              type="text"
              placeholder="name"
              className="me-2"
              aria-label="Search"
              value={nameFilter}
              onChange={(e) => setnameFilter(e.target.value)}
            />
        
      </Form.Group>
            
            {/* <Button onClick={() => setData({name: "asd"})} variant="outline-success">name</Button> */}
            {/* <Button onClick={() => setData({})} variant="outline-success">"{}"</Button> */}
      <Form.Group className="mb-3" controlId="my_multiselect_field">
      <Form.Label className="mb-3">Disabled select menu</Form.Label>
        <Form.Select as="select" multiple value={specialFilter} onChange={e => setspecialFilter([].slice.call(e.target.selectedOptions).map(item => item.value))}>
        <option>please select your filter</option>
          <option value={"pop"}>Pop</option>
          <option value={'metal'}>Metal</option>
          <option value={'jazz'}>Jazz</option>
          <option value={'country'}>Country</option>
          <option value={'edm'}>edm</option>
          <option value={'classic'}>Classic</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit" onClick={() => {
              console.log(specialFilter) ;
              setData({name: nameFilter,specialization: specialFilter}) ;
              console.log(data) ;
              setIsFilter(true)}} 
              variant="outline-success">Filter
        </Button>
    </Nav>







    
      {musicians &&
        musicians.map((musician) => {
          // console.log(musician);
          return `${musician.first_name} ${musician.last_name}`;
        })}
    </div>
  );
}
