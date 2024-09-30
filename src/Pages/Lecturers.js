import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {Buffer} from 'buffer';

import TopNav from '../Components/TopNav';
import SideNav from '../Components/SideNav';

import filt from  '../Images/filter.svg';
   
import "../Styles/Pages/lecturers.css";

function Lecturers() {

    const token = localStorage.getItem('atoken');
    const navigate = useNavigate();

    const [firstElement, firstElementShow] = useState(true);
    const [secondElement, secondElementShow] = useState(false);

    const [data, setData] = useState([]);

    const [title, setTitle] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [biography, setBiography] = useState('');
    const [picture, setPicture] = useState();

    useEffect(() => {
        const datar = async () => {
            await axios({
                method: 'get',
                url: "https://ahiajoku-backend-web.onrender.com/lecturers",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : token
                }
            })
            .then(res => setData(res.data))
            .catch(error => console.error(error))
        }

        datar()
        
        if ((!localStorage.getItem('atoken')) || (typeof localStorage.getItem('atoken') !== "string") || localStorage.getItem('atoken') == "") {
            navigate("/login");
        }
        
    }, [navigate, token])

    const addLec = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://ahiajoku-backend-web.onrender.com/lecturers',
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            },
            data: {
                title: title,
                firstname: firstname,
                lastname: lastname,
                email: email,
                biography: biography,
                picture: picture
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(error => console.error(error))
    }

    Buffer.from('anything','base64');

  return (
    <div id='lecturers'>
        <Helmet>
            <title>Lecturers - Ahiajioku admin</title>
            <meta name="viewport" content="width=2500,initial-scale=1,shrink-to-fit=no"/>
        </Helmet>
        <TopNav/>
        <div id='lecmain'>
            <SideNav/>
            {firstElement ?
                <div id='mainbd'>
                    <div id='main1'>
                        <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>Lecturers</span>
                        <span style={{width: "60%", justifyContent: "space-between", display: "flex"}}>
                            <input type='search' placeholder='Search'/>
                            <button>Filter
                                <img alt='' src={filt}/>
                            </button>
                        </span>
                        <button id='buttn' onClick={() => {secondElementShow(true);firstElementShow(false)}}>Add New</button>
                    </div>
                    <div id='main2' style={{display: (data.length < 4 ? "flex" : "ruby")}}>
                        {data.map((data, i) => (
                            <div className='col-3' key={i}>
                                <img alt='' src={`data:${data.picture.contentType}; base64, ${Buffer.from(data.picture.data.data).toString('base64')}`}/>
                                <p>{data.title + " " + data.firstname + " " + data.lastname}</p>
                            </div>
                        ))}
                    </div>
                </div>
            : ""}
            {secondElement ?
                <div id='mainbd'>
                    <div id='main1' style={{paddingBottom: "2%"}}>
                        <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>New Lecturer</span>
                        <span style={{width: "60%", justifyContent: "space-between", display: "flex"}}></span>
                        <button style={{backgroundColor: "red"}} id='buttn' onClick={() => {secondElementShow(false); firstElementShow(true)}}><i  style={{paddingRight: "10px"}} className="fa-solid fa-left-long"></i>Back</button>
                    </div>
                    <div id='main2' style={{backgroundColor: "white", padding: "2% 2%", borderRadius: "10px", fontFamily: "Nunito Sans"}}>
                        <form style={{display: "grid", width: "100%"}} onSubmit={addLec}>
                            <input type='file' style={{placeSelf: "center", marginBottom: "1.5%"}} onChange={e => setPicture(e.target.files[0])}/>
                            <div style={{display: "flex"}}>
                                <span style={{display: 'grid', width: '49%', paddingRight: '2%'}}>
                                    <label>Lecturer Email</label>
                                    <input type='email' style={{height: "35px", marginBottom: "1.5%", border: "2px solid #CECECE", fontSize: "20px"}} onChange={e => setEmail(e.target.value)}/>
                                </span>
                                <span style={{display: 'grid', width: '49%'}}>
                                    <label>Lecturer Title</label>
                                    <input type='text' style={{height: "35px", marginBottom: "1.5%", border: "2px solid #CECECE", fontSize: "20px"}} onChange={e => setTitle(e.target.value)}/>
                                </span>
                            </div>
                            <div style={{display: "flex"}}>
                                <span style={{display: 'grid', width: '49%', paddingRight: '2%'}}>
                                    <label>Lecturer Firstname</label>
                                    <input type='text' style={{height: "35px", marginBottom: "1.5%", border: "2px solid #CECECE", fontSize: "20px"}} onChange={e => setFirstname(e.target.value)}/>
                                </span>
                                <span style={{display: 'grid', width: '49%'}}>
                                    <label>Lecturer Lastname</label>
                                    <input type='text' style={{height: "35px", marginBottom: "1.5%", border: "2px solid #CECECE", fontSize: "20px"}} onChange={e => setLastname(e.target.value)}/>
                                </span>
                            </div>
                            <label>Biography</label>
                            <textarea onChange={e => setBiography(e.target.value)} style={{height: "300px", border: "2px solid #CECECE", marginBottom: "1.5%", fontSize: "20px"}}></textarea>
                            <button style={{textAlign: "center", backgroundColor: "#308A11", color: "white", border: "none", padding: "1% 1%", borderRadius: "10px", fontSize: "20px"}}>Add</button>
                        </form>
                    </div>
                </div>
            : "" }
        </div>

    </div>
  )
}

export default Lecturers