import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {Buffer} from 'buffer';

import TopNav from '../Components/TopNav';
import SideNav from '../Components/SideNav';

import filt from  '../Images/filter.svg';

import "../Styles/Pages/Gallery.css"

function Gallery() {

    const navigate = useNavigate();
    const token = localStorage.getItem('atoken')

    const [firstElement, firstElementShow] = useState(true);
    const [secondElement, secondElementShow] = useState(false);

    const [data, setData] = useState([]);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState()

    useEffect(() => {
        const datar = async () => {
            await axios({
                method: 'get',
                url: "https://ahiajoku-backend-web.onrender.com/gallery",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : token
                }
            })
            .then(res => setData(res.data))
            .catch(error => console.error(error)
            )
        }

        datar()

        if ((!localStorage.getItem('atoken')) || (typeof localStorage.getItem('atoken') !== "string") || localStorage.getItem('atoken') == "") {
            navigate("/login");
        }

    }, [navigate, token])

    const addGall = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: 'https://ahiajoku-backend-web.onrender.com/gallery',
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            },
            data: {
                title: title,
                description: "An Uploaded image",
                image: image
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(error => console.error(error))
    }

    Buffer.from('anything','base64');

    return (
        <div id='gallery'>
            <Helmet>
                <title>Gallery - Ahiajioku admin</title>
                <meta name="viewport" content="width=2500,initial-scale=1,shrink-to-fit=no"/>
            </Helmet>
            <TopNav/>
            <div id='lecmain'>
                <SideNav/>
                {firstElement ?
                    <div id='mainbd'>
                        <div id='main1'>
                            <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>Gallery</span>
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
                                <div className="col-3" key={i}>
                                        <img alt='' src={`data:${data.image.contentType}; base64, ${Buffer.from(data.image.data.data).toString('base64')}`}/>
                                        <p>{data.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                : ""}
                {secondElement ? 
                <div id='mainbd'>
                    <div id='main1'>
                        <span style={{fontSize: "30px", fontWeight: "700", color: "#202224"}}>Add Gallery</span>
                        <span style={{width: "60%", justifyContent: "space-between", display: "flex"}}></span>
                        <button style={{backgroundColor: "red"}} id='buttn' onClick={() => {secondElementShow(false);firstElementShow(true)}}><i  style={{paddingRight: "10px"}} className="fa-solid fa-left-long"></i>Back</button>
                    </div>
                    <div id='main2'>
                        <form style={{display: "grid"}} onSubmit={addGall} encType='multipart/form-data'>
                            <label style={{justifySelf: "left"}}>Title</label>
                            <input type='text' onChange={e => setTitle(e.target.value)} style={{width: "100%", height: "35px", marginBottom: "5%", border: "2px solid #CECECE", fontSize: "20px"}}/>
                            <input type='file' style={{placeSelf: "center", marginBottom: "5%"}} onChange={e => setImage(e.target.files[0])}/>
                            <button style={{textAlign: "center", backgroundColor: "#308A11", color: "white", border: "none", padding: "2% 1%", borderRadius: "10px", fontSize: "20px"}}>Add</button>
                        </form>
                    </div>
                </div>
                : "" }
            </div>
        </div>
    )
}

export default Gallery;