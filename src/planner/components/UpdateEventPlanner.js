import React, {useEffect, useState} from 'react';

import { useLocation} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col,  Row} from "react-bootstrap";

import '../../commons/styles/events.css';

import moment from "moment";

import * as API_USERS from "../api/planner-api";
import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${Background})`,
};

function UpdateEventPlanner() {
    const {state} =useLocation();
    const initialValues = { loc: "", number:"",period:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [startDate, setStartDate] = useState(new Date());
   localStorage.setItem("name_of_client", state.events.name_of_client);


    function update(userEvent){

        return API_USERS.updateEvent(state.events.id,userEvent ,(result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully updated event " + result);


            }
            reloadAfterUpdate();
        });
    }
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
            updateEvents();
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        if (!values.loc) {
            errors.loc = "Required field!";
        }
        if (!values.number) {
            errors.number = "Required field!";
        }
        if (!values.period) {
            errors.period = "Required field!";
        }

        return errors;
    }
    function updateEvents(){

        let eventDTO = {
            location: document.getElementById("loc").value,
            number_of_persons: document.getElementById("number").value,
            period_of_time_for_event: document.getElementById("period").value,
            date: startDate.getDate() + "/" + (startDate.getMonth()+1) + "/"+startDate.getFullYear(),
            id_planner: localStorage.getItem("plannerId"),
            name_of_client: localStorage.getItem("name_of_client")

        };
console.log( localStorage.getItem("name_of_client"));
        update(eventDTO);
    }

    function fetchEvents(){
        return API_USERS.getEvents((result, status, err) => {

        });
    }

    function reloadAfterUpdate(){
        window.location.href="/events";

    }


    return (
        <div>
            <div className="container-login100" style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>
                   < p>{formErrors.location}</p>

                <div className="field"  style={{width: '400px'}}>
                    <Label> Location: </Label>
                    <input className="input100" type="text" name="loc" id= "loc" placeholder="Location" value={formValues.location}
                           onChange={handleChange}/>
                <span className="symbol-input">
							    <i className="fa fa-location-arrow" aria-hidden="true"/>
						    </span>
                </div>


                <p>{formErrors.number}</p>

                <div className="field"  style={{width: '400px'}}>
                    <Label> Number of persons: </Label>
                    <input className="input100" type="text" name="number" id= "number" placeholder="Number of persons" value={formValues.number}
                           onChange={handleChange}/>
                <span className="symbol-input">
							   	 <i className="fa fa-users" aria-hidden="true"/>
						    </span>
                </div>


                <p>{formErrors.period}</p>

                <div className="field"  style={{width: '400px'}}>
                    <Label for='period_of_time_for_eventField'> Period of time: </Label>
                    <input className="input100" type="text" name="period" id= "period" placeholder="Period of time" value={formValues.period}
                           onChange={handleChange}/>
                <span className="symbol-input">
							   <i className="fa fa-clock-o" aria-hidden="true"/>
						    </span>

                </div>

                        <div className="field"  style={{width: '400px'}}>
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
                        </div>
<br/>
                <Row className="container-login100-form-btn">
                    <Col xs lg="4">
                        <button className="login100-form-btn">Update Event</button>
                        {/*<button type="button" className="login100-form-btn" onClick={addEventPlanner}>Add Event</button>*/}
                    </Col>
                </Row>

            </form>
                </div>
                </div>
        </div>
    );

}
export default UpdateEventPlanner;