import React, {useEffect, useRef, useState} from 'react';

import { useLocation, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Input, Label} from "reactstrap";
import {Col, FormGroup, Row} from "react-bootstrap";
import * as API_PLANNER from "../../planner/api/planner-api";
import moment from "moment";
import Background from "../../commons/images/background4.jpg";
import "../../commons/styles/error.css"
import Button from "react-bootstrap/Button";
const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};


function AddEventByPlanner() {
    const initialValues = { nameClient: "", location: "", number:"",period:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            addEventPlanner();
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        if (!values.nameClient) {
            errors.nameClient = "Required field!";
        }
       else  if(values.nameClient.length <5 ){
            errors.nameClient = "Must have at least 5 characters!"
        }
        if (!values.location) {
            errors.location = "Required field!";
        }
        if (!values.number) {
            errors.number = "Required field!";
        }
        if (!values.period) {
            errors.period = "Required field!";
        }

        return errors;
    }
    function postEvents(userEvent){
        return API_PLANNER.addEventPlanner(userEvent, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully add event " + result);


            }
            reloadAfterAdd();
        });
    }
    function reloadAfterAdd(){
        window.location.href="/events";

    }

    function addEventPlanner(){

        let eventDTO = {
            location: document.getElementById("location").value,
            number_of_persons: document.getElementById("number").value,
            period_of_time_for_event: document.getElementById("period").value,
            date: startDate.getDate() + "/" + (startDate.getMonth()+1) + "/"+startDate.getFullYear(),
            name_of_client:  document.getElementById("nameClient").value,

        };

        console.log(document.getElementById("nameClient").value);

        postEvents(eventDTO);


    }




    return (
        <div>
            <div  key={localStorage.getItem("plannerEventsId")} >
                <h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Add New Event</h5>

            </div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>

                        <p>{formErrors.nameClient}</p>
                        <div className="field" >
                        <Label> Name of client: </Label>
                        <input className="input100" type="text" name="nameClient" id= "nameClient" placeholder="Name of client" value={formValues.nameClient}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							     <i className="fa fa-user-circle-o" />
						            </span>
                        </div>

                        <p>{formErrors.location}</p>
                        <div className="field">
                        <Label> Location: </Label>
                        <input className="input100" type="text" name="location" id= "location" placeholder="Location" value={formValues.location}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							   <i className="fa fa-location-arrow" aria-hidden="true"/>
						    </span>

                        </div>


                        <p>{formErrors.number}</p>
                        <div className="field">
                        <Label> Number of persons: </Label>
                        <input className="input100" type="text" name="number" id= "number" placeholder="Number of persons" value={formValues.number}
                               onChange={handleChange}/>

                        <span className="symbol-input">
							 <i className="fa fa-users" aria-hidden="true"/>
						    </span>

                        </div>


                        <p>{formErrors.period}</p>
                        <div className="field">
                        <Label for='period_of_time_for_eventField'> Period of time: </Label>
                        <input className="input100" type="text" name="period" id= "period" placeholder="Period of time" value={formValues.period}
                               onChange={handleChange}/>
                        <span className="symbol-input">
							 <i className="fa fa-clock-o" aria-hidden="true"/>
						    </span>
                        </div>

                        <div className="field">
                        <style>
                            {`.date-picker input {
                             width: 100%,
                             color:red
                             
                         }`}
                        </style>
                        <Label> Event Date: </Label>
                        <DatePicker  minDate={moment().toDate()} showMonthDropdown
                                     showYearDropdown
                                     dropdownMode="select" selected={startDate}  onChange={ (date:Date) =>  setStartDate(date)} wrapperClassName="date-picker"/>
                    </div>


                        <br/> <br/>
                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">
                            <button className="login100-form-btn">Add Event</button>
                            {/*<button type="button" className="login100-form-btn" onClick={addEventPlanner}>Add Event</button>*/}
                        </Col>
                    </Row>

                    </form>
                </div>
            </div></div>
    );

}
export default AddEventByPlanner;