import React from 'react'
import { Button, Stack,Row,Nav, Form , Card, Container} from 'react-bootstrap' ;
import "bootstrap/dist/css/bootstrap.min.css";

export default function PeopleCard({musician}) {
    console.log(musician) ;
  return (
    <div className={"col-xs-12 col-sm-6 col-md-4"}>
      <div className={"image-flip"}>
          <div className={"mainflip"}>
              <div className={"frontside"}>
    <Card className={"text-dark d-flex"} style={{ width: '18rem'}}>
      <Card.Img variant="top" src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?b=1&s=170667a&w=0&k=20&c=TXCiY7rYEvIBd6ibj2bE-VbJu0rRGy3MlHwxt2LHt9w=" />
      <Card.Body>
        <Card.Title className={"text-dark"}>{musician}</Card.Title>
        <Card.Text>
          this is where detail wil be.
        </Card.Text>
      </Card.Body>
    </Card></div>
    <div className={"backside"}>
    <Card className={"text-dark d-flex"} style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title className={"text-dark"}>{musician}</Card.Title>
        <Card.Text>
          this is where detail wil be.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </div></div></div>
  )
}
