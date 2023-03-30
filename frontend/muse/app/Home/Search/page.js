"use client";
import PeopleCard from "../../../ui/PeopleCard";
import React, { useEffect, useState } from "react";
import { Button, Stack,Row,Nav, Form , Card, Container,Col} from 'react-bootstrap' ;
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });

export default function page() {
  const [musicians, setMusicians] = useState(null);
  const [isFilter, setIsFilter] = useState(false);
  const [data, setData] = useState({});
  const [nameFilter, setnameFilter] = useState("");
  const [options, setOptions] = useState(['pop','metal','jazz','country','edm','classic']);
  const [specialFilter, setspecialFilter] = useState([]);
  const [placeholder, setPlaceholder] = useState("specialization");

  //effect when press filter
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

    //effect when press select specialiazation
  useEffect(() => {
    // get all musician with filter condition
    if(specialFilter.length == 0){
      console.log("blank") ;
      setPlaceholder("specialization")
    } else {
      setPlaceholder("")
    }
    console.log(specialFilter) ;
  }, [specialFilter]);

  const filterHandler = (e) => {
    e.preventDefault(); // prevent form submission
  }

  return (
    <div>
      <div>
        <h1 
          style = {{
            fontSize: '36px',
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: 'Montserrat, sans-serif',
            letterSpacing: '2px',
            marginTop: '20px'
          }}>This is head</h1>
      </div>
      <Nav style={{ marginBottom: "50px" }}>
        <Form onSubmit={filterHandler}>
          <Row>
            <Col sm="6" md="4" lg="3" className="mb-3">
              <Form.Control
                name="name"
                type="text"
                placeholder="Search by name"
                value={nameFilter}
                onChange={(e) => setnameFilter(e.target.value)}
              />
            </Col>
            <Col sm="6" md="4" lg="3" className="mb-3">
              <Multiselect
                isObject={false}
                options={options}
                placeholder={placeholder}
                showCheckbox
                displayValue="try"
                onRemove={(e) =>
                  setspecialFilter([].slice.call(e).map((item) => item))
                }
                onSelect={(e) =>
                  setspecialFilter([].slice.call(e).map((item) => item))
                }
              />
            </Col>
            <Col sm="12" md="4" lg="3" className="mb-3">
              <Button type="submit" variant="success" block>
                Filter
              </Button>
            </Col>
          </Row>
        </Form>
      </Nav>
      <Container fluid>
        <Row>
          <PeopleCard musicians={isFilter ? data : musicians} />
        </Row>
      </Container>
    </div>
  );
}
