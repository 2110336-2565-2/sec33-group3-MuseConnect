import React from 'react'
import { Button, Stack,Row,Nav, Form , Card, Container} from 'react-bootstrap' ;
import "bootstrap/dist/css/bootstrap.min.css";

export default function PeopleCard({musicians}) {
    console.log(musicians) ;
    let i = 0 ;
  return (
    <>
    {musicians?.map((musician) => (
    //<div key={i++} className={"col-xs-6 col-sm-2 col-md-4"}>
    <div key={i++} className="box">
      <div className={"image-flip"}>
        <div className={"mainflip"}>
          <div className={"frontside"}>
            <Card className={"text-dark d-flex"} style={{ width: '18rem'}}>
              <Card.Img variant="top" src="https://media.istockphoto.com/id/1300512215/photo/headshot-portrait-of-smiling-ethnic-businessman-in-office.jpg?b=1&s=170667a&w=0&k=20&c=TXCiY7rYEvIBd6ibj2bE-VbJu0rRGy3MlHwxt2LHt9w=" />
              <Card.Body>
                <Card.Title className={"text-dark"}>{musician.first_name}</Card.Title>
                <Card.Text>
                  this is where detail wil be.
                </Card.Text>
              </Card.Body>
            </Card></div>
          <div className={"backside"}>
            <Card className={"text-dark d-flex"} style={{ width: '18rem'}}>
              <Card.Body>
                <Card.Title className={"text-dark"}>{musician.first_name}</Card.Title>
                <Card.Text>
                  this is where detail wil be.
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Button>
                  <a href={`/Home/Search/${musician._id}`}>press</a>
                  {/* <a href='/Home/Search'>press</a> */}
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
    ))}
    </>
  ) ;
}