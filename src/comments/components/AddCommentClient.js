import React, { useState} from 'react';

import { useLocation} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import * as API_COMM from "../api/comment-api";
import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

function AddCommentClient() {


    const today = new Date(),
        date = today.getDate() +'/' +(today.getMonth() + 1) +'/' +today.getFullYear();

    const {state} =useLocation();
    const id=state.events.id;
    function postComments(comment){
        return API_COMM.addCommClient(comment, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully add comment " + result);


            }

            reloadAfterAdd();
        });
    }
    function reloadAfterAdd(){

            window.location.href="/ourWorkDashboard";


    }

    function addComment(){

        let commentDTO = {
            comment: document.getElementById("comment").value,
            date: document.getElementById("date").value,
            id_client: localStorage.getItem("UserId"),
            id_event:id
        };


        postComments(commentDTO);


    }




    return (
        <div>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgb(16,3,10)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Add New Comment</h5>

            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">

                    <FormGroup className="register-input" >
                        <Label> Comment: </Label>
                        <textarea className="form-control" id="comment" cols="30" rows="8" placeholder="Your comment" name="comment"/>

                    </FormGroup>

                    <br/>   <br/>    <br/>
                    <br/>  <br/>   <br/>    <br/>
                    <br/><br/><br/>

                    <div  className="register-input" >
                        <style>
                            {`.date-picker input {
                             width: 100%,
                             color:red
                             
                         }`}
                        </style>
                        <Label> Date: </Label>
                        <div className="field" style={{width: '400px'}}>
                            <input className="input100"  defaultValue={date}
                                   placeholder="Date"
                                   type="text"
                                   name="date"
                                   id="date"

                            />
                            <span className="symbol-input">
                             <i className="fa fa-calendar" aria-hidden="true"/>
                          </span>
                        </div>
                    </div>
                    <br/>   <br/>    <br/>
                    <br/>
                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">

                            <button type="button" className="login100-form-btn" onClick={addComment}>Add Comment</button>
                        </Col>
                    </Row>

                </div>
            </div></div>
    );

}
export default AddCommentClient;