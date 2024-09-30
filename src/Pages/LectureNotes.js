import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {Buffer} from 'buffer';

import TopNav from '../Components/TopNav';
import SideNav from '../Components/SideNav';

import filt from  '../Images/filter.svg';

import "../Styles/Pages/lecturenotes.css";

function LectureNotes() {

    const token = localStorage.getItem('atoken')
    const navigate = useNavigate();

    const [firstElement, firstElementShow] = useState(true);
    const [secondElement, secondElementShow] = useState(false);

    const [data, setData] = useState([]);
    const [lecturer, setLecturer] = useState([]);

    const [image, setimage] = useState();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('')


    useEffect(() => {
        const datar = async () => {
            await axios({
                method: 'get',
                url: 'https://ahiajoku-backend-web.onrender.com/lecture_notes',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            })
            .then(res => setData(res.data))
            .catch(error => console.error(error))
        }

        const lecturers = async () => {
            await axios({
                method: 'get',
                url: "https://ahiajoku-backend-web.onrender.com/lecturers",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : token
                }
            })
            .then(res => setLecturer(res.data))
            .catch(error => console.error(error))
        }

        datar()
        lecturers()

        if ((!localStorage.getItem('atoken')) || (typeof localStorage.getItem('atoken') !== "string") || localStorage.getItem('atoken') == "") {
            navigate("/login");
        }
        
    }, [navigate, token])

    const addNote = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://ahiajoku-backend-web.onrender.com/lecture_notes',
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            },
            data: {
                title: title,
                author: author,
                date: date,
                note: note,
                coverImage: image
            }
        })
        .then(res => {
            console.log(res.data)
            window.location.reload();
        })
        .catch(error => console.error(error))
    }


    Buffer.from('anything','base64');

  return (
    <div id='lecturenotes'>
        <Helmet>
            <title>Notes - Ahiajioku admin</title>
            <meta name="viewport" content="width=2500,initial-scale=1,shrink-to-fit=no"/>
        </Helmet>
        <TopNav/>
        <div id='lecmain'>
            <SideNav/>
            {firstElement ?
                <div id='mainbd'>
                    <div id='main1'>
                        <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>Lecturer Notes</span>
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
                                <img alt='' src={`data:${data.coverImage.contentType}; base64, ${Buffer.from(data.coverImage.data.data).toString('base64')}`}/>
                                <strong>{data.title}</strong>
                                <p>{data.note.substr(0, 50)}...</p>
                                <strong>{data.author}</strong>
                                <p>{data.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            : "" }
            {secondElement ?
                <div id='mainbd'>
                    <div id='main1' style={{paddingBottom: "2%"}}>
                        <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>Add New Note</span>
                        <span style={{width: "60%", justifyContent: "space-between", display: "flex"}}></span>
                        <button style={{backgroundColor: "red"}} id='buttn' onClick={() => {secondElementShow(false);firstElementShow(true)}}><i  style={{paddingRight: "10px"}} className="fa-solid fa-left-long"></i>Back</button>
                    </div>
                    <div id='main2' style={{backgroundColor: "white", display: "grid", paddingLeft: "2%", paddingRight: "2%"}}>
                        <form style={{display: "grid", width: "100%"}} encType='multipart/form-data' onSubmit={addNote}>
                            <label style={{placeSelf: "center", marginBottom: "1%"}}>Cover Image</label>
                            <input onChange={e => setimage(e.target.files[0])} type='file' style={{placeSelf: "center", textAlignLast: "center", marginBottom: "2%", fontSize: "15px"}}/>
                            <span style={{display: "flex", justifyContent: "space-between"}}>
                                <span style={{display: "grid", width: "30%", marginBottom: "2%"}}>
                                    <label>Lecture Title</label>
                                    <input onChange={e => setTitle(e.target.value)} style={{height: "40px"}} type='text'/>
                                </span>
                                <span style={{display: "grid", width: "30%", marginBottom: "2%"}}>
                                    <label>Select Lecturer</label>
                                    <select style={{height: "40px"}} value={author} onChange={e => setAuthor(e.target.value)}>
                                        <option></option>
                                        {lecturer.map((lec, i) => (  
                                            <option key={i}>{lec.title + " " + lec.firstname + " " + lec.lastname}</option>
                                        ))}
                                    </select>
                                </span>
                                <span style={{display: "grid", width: "30%", marginBottom: "2%"}}>
                                    <label>Date</label>
                                    <input onChange={e => setDate(e.target.value)} style={{height: "40px"}} type='date'/>
                                </span>
                            </span>
                            <label>Lecture Note</label>
                            <textarea onChange={e => setNote(e.target.value)} style={{height: "300px"}}></textarea>
                            <button style={{textAlign: "center", backgroundColor: "#308A11", color: "white", border: "none", padding: "1% 1%", margin: '1% 0px', borderRadius: "10px", fontSize: "20px"}}>Add</button>
                        </form>
                    </div>
                </div>
            : "" }
        </div>
    </div>
  )
}

export default LectureNotes;