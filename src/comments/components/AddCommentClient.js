import React, {useEffect, useRef, useState} from 'react';

import { useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Input, Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import * as API_COMM from "../api/comment-api";
import moment from "moment";
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


    const [startDate, setStartDate] = useState(new Date());

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

            window.location.href="/plannerCards";


    }

    function addComment(){

        let commentDTO = {
            comment: document.getElementById("comment").value,
            date: startDate.getDate() + "/" + (startDate.getMonth()+1) + "/"+startDate.getFullYear(),
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
                        <Label> Comment Date: </Label>
                        <DatePicker  minDate={moment().toDate()} showMonthDropdown
                                     showYearDropdown
                                     dropdownMode="select" selected={startDate}  onChange={ (date:Date) =>  setStartDate(date)} wrapperClassName="date-picker"/>
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