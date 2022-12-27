import React, {useEffect, useState} from 'react';

import "react-datepicker/dist/react-datepicker.css";
import { Label} from "reactstrap";
import {Col, Row} from "react-bootstrap";
import * as API_CLIENT from "../../client/api/client-api";
import '../../commons/styles/events.css';
import {storage} from "../../firebase/firebase"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1000px",
    backgroundImage: `url(${Background})`,
};

function AddWorkEvent() {
    const initialValues = { name_of_event: "", location:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);


    const handleChangeValid = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };
    useEffect(() => {

        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            addYourEvent();
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.name_of_event) {
            errors. name_of_event = "Required field!";
        }
        if (!values.location) {
            errors.location = "Required field!";
        }

        return errors;
    }
    const handleChange = e => {

        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    function reloadAfterAdd(){
        window.location.href="/addDetailsEvent";

    }
    const handleUpload = () => {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },

                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setUrl(downloadURL)
                    });
            }
        );
    };


    function postEvents(userEvent){
        return API_CLIENT.addOurWork(userEvent, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully added event " + result);


            }
            reloadAfterAdd();
        });
    }

    function addYourEvent(){

        let eventDTO = {
            name_of_event: document.getElementById("name_of_event").value,
            location: document.getElementById("location").value,
            image_path: url,
            id_planner:localStorage.getItem("UserId"),

        };

        postEvents(eventDTO);
    }




    return (
        <div >
            <div className="container-login100"style={backgroundStyle}>
                <div className="wrap-login100">
                    <form onSubmit={handleSubmit}>
                        < p>{formErrors.name_of_event}</p>

                        <div className="field" style={{width: '400px'}}>
                        <Label> Name of event: </Label>
                        <input className="input100" type="text" name="name_of_event" id= "name_of_event" placeholder="Name of event" value={formValues.name_of_event}
                               onChange={handleChangeValid}/>

                        <span className="symbol-input">
							   <i className="fa fa-glass" aria-hidden="true"/>
						    </span>

                    </div>

                        <br/>
                        < p>{formErrors.location}</p>
                        <div className="field" style={{width: '400px'}}>
                        <Label> Location: </Label>
                        <input className="input100" type="text" name="location" id= "location" placeholder="Location" value={formValues.location}
                               onChange={handleChangeValid}/>

                        <span className="symbol-input">
							    <i className="fa fa-location-arrow" aria-hidden="true"/>
						    </span>

                    </div>

                    <br/>
                        <div className="field" style={{width: '400px'}}>
                    <input type="file"  id= "image_path" onChange={handleChange} />
                        <button type="button" onClick={handleUpload}>Upload</button>
                        <img src={url || "http://via.placeholder.com/300"} className="photo" alt="firebase-image" />
                    </div>
                       <br/>

                    <Row className="container-login100-form-btn">
                        <Col xs lg="4">

                            <button  className="login100-form-btn">Add Event</button>
                        </Col>
                    </Row>

                    </form>
                </div>
            </div></div>
    );

}
export default AddWorkEvent;