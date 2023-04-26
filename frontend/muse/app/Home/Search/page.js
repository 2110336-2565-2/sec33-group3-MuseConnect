"use client";
import PeopleCard from "../../../ui/PeopleCard";
import React, { useEffect, useState } from "react";
import { Button, Stack,Row,Nav, Form , Card, Container} from 'react-bootstrap' ;
// import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Multiselect from 'multiselect-react-dropdown';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../globals.css"
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });
const {API_HOST} = require("../../../config/index")

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
        m: 10,
        ...data
      }).toString();
      console.log(queryParams);
      const respone = await fetch(
        `${API_HOST}/api/musician?` + queryParams,
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
      setPlaceholder("Specialization")
    } else {
      setPlaceholder("")
    }
    console.log(specialFilter) ;
  }, [specialFilter]);

  const filterHandler = (e) => {
    e.preventDefault(); // prevent form submission
  }

  return (
    <div className={montserrat.className}>
    <div><h1 style={{marginLeft:"2em", marginTop:"1em"}}>Search your favorite musicians.</h1></div>
    <div><h6 style={{marginLeft:"5em", marginButt:"0em"}}>Please choose at least one specialization.</h6></div>
    <div style={{marginLeft:"5.5em"}}>
      <Nav style={{marginTop:"0.5em"}}>
      <Form.Group className="d-flex" onSubmit={filterHandler}>
              <Form.Control
                name="name"
                type="text"
                placeholder="Name"
                className="me-2"
                aria-label="Search"
                value={nameFilter}
                onChange={(e) => setnameFilter(e.target.value)}
                style={{width:"30em"}}
              />
          
        </Form.Group>

        <Button type="submit" onClick={() => {
          console.log(specialFilter) ;
          setData({name: nameFilter,specialization: specialFilter}) ;
          console.log(data) ;
          setIsFilter(true)}} 
          variant="outline-success">Filter
        </Button>
        </Nav>

        <Nav style={{marginTop:"0.5em",marginBottom:"3em"}}>
        <div className="text-dark d-flex" style={{backgroundColor: "white",borderRadius:"7px"}}>
          <Multiselect
          isObject ={false}
          options ={options}
          placeholder = {placeholder}
          showCheckbox
          displayValue="try"
          onRemove={e => setspecialFilter([].slice.call(e).map(item => item))}
          onSelect={e => setspecialFilter([].slice.call(e).map(item => item))}
          />
        </div>
        </Nav>
      </div>
        {(musicians!=null && musicians.length==0)?(
              <div><h4 style={{marginLeft:"3.2em"}}>Sorry, no results found.</h4></div>
            )
            :(
      <Container className={montserrat.className} style={{marginLeft:"4.5em"}} fluid>
        <Row md={4}><PeopleCard className={montserrat.className} musicians={musicians}/></Row>
      </Container>
            )}
    </div>
  );
}
