import React from 'react'
import { Button, Stack,Row,Nav, Form , Card, Container, Image,Col} from 'react-bootstrap' ;
import "bootstrap/dist/css/bootstrap.min.css";

export default function PeopleCard({musicians}) {
    console.log(musicians) ;
    let i = 0 ;
  return (
    <>
    {musicians?.map((musician) => (
    <Col key={i++} style={{color: "black",marginBottom:"1em"}}>
      <a href={`Search/${musician._id}`}>
      <Card className="cardA cardA-block" >
          <Card.Img src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" alt="Photo of sunset"/>
          <Card.Title className="cardA-title" style={{color: "black", padding:"0.5em",marginBottom:"0px"}}>{musician.first_name +" "+ musician.last_name}</Card.Title>

        <Stack direction='horizontal' style={{marginLeft:"0.5em"}} gap={1}>{(musician.specialization)?.map((pref) => (
          <h5><span class="badge rounded-pill" style={{ fontWeight: "normal",fontSize:"12px", background:"#65D36E", margin:"0.2em"}}>{pref}</span></h5>))}
        </Stack>
      </Card></a>
    </Col>
    ))}
    </>
  ) ;
}