import React from 'react'
import { Button, Stack,Row,Nav, Form , Card, Container, Image} from 'react-bootstrap' ;
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./PeopleCard.module.css"

export default function PeopleCard({musicians}) {
    console.log(musicians) ;
    let i = 0 ;
  return (
    <>
    {musicians?.map((musician) => (
    //<div key={i++} className={"col-xs-6 col-sm-2 col-md-4"}>
    <div className="col-md-3 col-sm-6">
      <div className="card card-block">
        <h4 className={style.card-title}><i className="material-icons">settings</i></h4>
          <Image src="https://static.pexels.com/photos/7096/people-woman-coffee-meeting.jpg" alt="Photo of sunset"/>
        <h5 className="card-title mt-3 mb-3">Sierra Web Development • Owner</h5>
        <p className="card-text">This is a company that builds websites, web apps and e-commerce solutions.</p> 
      </div>
    </div>
    ))}
    </>
  ) ;
}