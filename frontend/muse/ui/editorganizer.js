'use client'
import { Formik, Field, Form } from 'formik'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from "./Edit.css";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//Select and makeAnimated is used for preference input, you can install using "npm i --save react-select"
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input"
import { createContext } from 'react'
const Context = createContext()
import { Montserrat } from '@next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] });
//import {redirect} from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function EditOrganizerForm() {
    const router = useRouter();
    const [user, setUser] = useState({});
    const [picture, setPicture] = useState(null);
    const genreOptions = [
        { value: 'Pop', label: 'Pop' },
        { value: 'Rock', label: 'Rock' },
        { value: 'Jazz', label: 'Jazz' },
        { value: 'Country', label: 'Country' },
        { value: 'Alternative', label: 'Alternative' }
    ];  
    // const animatedComponents = makeAnimated();
    
    //Get user's info from database
    useEffect(() => {
        const getUser =async () =>{
            const user_loc  = localStorage.getItem("user");
            const userToken = await JSON.parse(user_loc).token;
            const userID = await JSON.parse(user_loc)._id;
            const respone = await fetch(`http://localhost:4000/api/user/${userID}`, { //ส่งไอดีมาแปะแทนด้วย
                method: "GET",
                headers: {
                authorization: `Bearer ${userToken}`,
                },
            });
            const result = await respone.json();
            if (!respone.ok) {
                alert(result.error);
            } else {
                setUser(result)
            }
        }
        getUser() ;
        console.log("use effect");
    },[]);


    const test = async () => {
        const files = document.getElementsByClassName("picture")[0].files;
        if (files.length !== 0) {
            let f = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onloadend = () => {
                const base64String = reader.result;
                sendData(base64String);
                console.log("send picture successfully");
            };
        } else {
            alert("no picture");
        }
    };

    const onSubmit = async ({profile_picture: base64,...values}, actions) => {
        //if len=0 --> remove or delete
        const user_loc  = localStorage.getItem("user");
        const userToken = await JSON.parse(user_loc).token;
        const userID = await JSON.parse(user_loc)._id;
        const respone = await fetch(`http://localhost:4000/api/user/${userID}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({profile_picture: base64,...values})
        })
        const result = await respone.json()
        if(!respone.ok){
            actions.setSubmitting(false);
            //const out = result.error;
            //console.log(out);
        }
        else{
            localStorage.setItem('user',JSON.stringify(result))
            alert("Your changes have been saved");
            //window.location.href="/Home/Profile";
            console.log("sucessfully");
            //router.push('/Home/Profile');
        }
        actions.setSubmitting(false);
    }

    const [value, setValue] = useState("");
    const [dataArray, setdataArray] = useState([]);
    
    const handleChange = (e)=>{
        if(e.target.checked === true){
            setdataArray([...dataArray, e.target.value]);
        }
        else if(e.target.checked === false){
            let freshArray = dataArray.filter(val => val !== e.target.value);
            setdataArray([...freshArray]);
        }
    }

    useEffect(()=>{
        console.log(dataArray);
    },[dataArray]);


    return (
        <div className={montserrat.className}>
        <p className='top'>
            <a className='topic' href="/Home/Profile">Edit profile</a>
        </p>
        <p className='subheading'>♫⋆｡♪ 01:01 ━━━━⬤───────────── 05:05 ♫⋆｡♪</p>
        
        <Formik
        initialValues={{first_name:'', last_name:'', phone_number:value, location:'',preference:dataArray,profile_picture:''}}
        onSubmit={({profile_picture: base64,...values}, actions) => onSubmit({profile_picture: base64,...values},actions)}>


        {props => (
            <form onSubmit={props.handleSubmit}>
                {/* Name */}
                <div className="field">
                    <p>Name</p>
                    <input className="form-control" type="text" 
                    placeholder={user.first_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.first_name}
                    name="first_name">    
                    </input>
                </div>


                {/* Last Name */}
                <div className="field">
                    <p style={{color: "White"}}>Last Name</p>
                    <input className="form-control" type="text" 
                    placeholder={user.last_name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.last_name}
                    name="last_name">    
                    </input>
                </div>


                {/* Phone Number */}
                <div className="field">
                    <p style={{color: "White"}}>Phone Number</p>
                    <PhoneInput className="form-control" type="text" 
                    placeholder={user.phone_number}
                    onChange={(number) => {props.values.phone_number = number}}
                    country={'TH'}
                    onBlur={props.handleBlur}
                    value={props.values.phone_number}
                    name="phone_number">   
                    </PhoneInput>
                </div>


                {/* Location */}
                <div className="field">
                    <p style={{color: "White"}}>Location</p>
                    <input className="form-control" type="text" 
                    placeholder={user.location}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.location}
                    name="location">    
                    </input>
                </div>


                <div className="field">
                    <p style={{color: "White"}}>Preference</p>
                    
                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Pop'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Pop</span>

                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Rock'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Rock</span>

                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Jazz'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Jazz</span>

                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Country'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Country</span>

                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Indie'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Indie</span>

                    <input class="form-check-input" style={{marginRight:"5px"}}
                    type="checkbox"
                    value='Alternative'
                    onChange={e => handleChange(e)} />
                    <span style={{color:"white",marginRight:"15px"}}>Alternative</span>
                </div>


                <div className="field">
                    <p style={{color: "White"}}>Profile Picture</p>
                    {/* <input type="file" className="picture" style={{color:"white",borderRadius:"8px"}}> */}
                    <input class="form-control" type="file" id="formFile" className="picture">
                    </input>
                </div>



                <div style={{textAlign: "left",marginBottom: "35px"}}>
                <button className="btn btn-outline-dark">
                    <a href="/Home/Profile" style={{textDecoration:"none",color:"white"}} className={montserrat.className}>Cancel</a>
                </button>
                    <button type="submit" className="btn btn-success" style={{marginLeft:"15px"}}>Save Changes</button>
                </div>
            </form>
        )}
        </Formik>
    </div>
    )
}