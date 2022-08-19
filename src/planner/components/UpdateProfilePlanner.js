import React, {useEffect, useState} from 'react';


import axios from 'axios';
import {Col, FormGroup, Row} from "react-bootstrap";
import {Label} from "reactstrap";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../firebase/firebase";
import * as API_USERS from "../../planner/api/planner-api";
import Background from "../../commons/images/background4.jpg";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1400px",
    backgroundImage: `url(${Background})`,
};


export function UpdateProfilePlanner() {

    const initialValues = {type:"", description: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const [values, setData] = useState([]);
    const [file, setFile] = useState(null);
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
            update();
        }
    }, [formErrors]);
    const handleChange = e => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const validate = (values) => {
        const errors = {};
        if (!values.type) {
            errors. type = "Required field!";
        }

        if (!values.description) {
            errors.description = "Required field!";
        }

        return errors;
    }


    const handleUpload = () => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

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

    useEffect(() => {
        const fetching = async () => {
            const {data} = await axios.get('http://localhost:8080/planner/plannerById',{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }   } )
            setData(data);
            console.log(data);


        }
        fetching();


    }, []);

    function updatePlanner(user){
        return API_USERS.updateProfile(user, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                alert("Successfully updated profile " + result);
                window.location.reload(false);
            }
            reloadAfterAdd();
        });
    }

    function update(){

        let plannerDTO = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            type_of_planner: document.getElementById("type").value,
            description: document.getElementById("description").value,
            image_path: url

        };

        updatePlanner(plannerDTO);
    }

    function reloadAfterAdd(){
        window.location.href="/planner";

    }

    return (

            <div ><h5 style={{color: 'rgba(76,78,78,0.65)', width:'60%',height:'10%', padding:'5px 100px',position:'relative',top:'20%',align : 'center'}}>Profile Update</h5>


        <div className="container-login100" style={backgroundStyle}>
            <div className="wrap-login100">

                <form onSubmit={handleSubmit}>

                    <Label> Name: </Label>
                    <div className="field" style={{width: '400px'}}>
            <input className="input100"  defaultValue={values.name}
                   placeholder="Name"
                   type="text"
                   name="name"
                   id="name"
            />
                    <span className="symbol-input">
                    <i className="fa fa-user-circle-o" aria-hidden="true"/>
                          </span>
                </div>
                    <Label> Email: </Label>
                    <div className="field" style={{width: '400px'}}>
            <input className="input100" defaultValue={values.email}
                   placeholder="email"
                   type="text"
                   name="email"
                   id="email"
            />
                    <span className="symbol-input">
                     <i className="fa fa-envelope-o" aria-hidden="true"/>
                          </span>
                </div>



                    <Label> Phone:  </Label>
                    <div className="field" style={{width: '400px'}}>
            <input className="input100" defaultValue={values.phone}
                   placeholder="phone"
                   type="text"
                   name="phone"
                   id="phone"
            />
                    <span className="focus-input100"/>
                    <span className="symbol-input">
              <i className="fa fa-phone" aria-hidden="true"/>
                          </span>
                    </div>


                < p>{formErrors.type}</p>

                <div className="field" style={{width: '400px'}}>
                    <Label> Type of planner: </Label>
                    <select className="input100" id="type" name="type" value={formValues.type}
                            onChange={handleChangeValid}>
                        <option value="0">Choose type...</option>
                        <option value="wedding">Wedding Planner</option>
                        <option value="baptism">Baptism Planner</option>
                        <option value="anniversary">Anniversary Planner</option>
                    </select>
                    <span className="symbol-input" >
							 <i className="fa fa-list-ol"  aria-hidden="true"/>
						    </span>

                </div>


                    <br/>

                < p>{formErrors.description}</p>

                <div className="field" style={{width: '400px'}}>
                    <Label> Description: </Label>
                    <textarea className="form-control" id="description" cols="30" rows="8" placeholder="Description" name="description" value={formValues.description}
                              onChange={handleChangeValid}/>


                </div>

                <br/><br/>

                    <div className="field" style={{width: '400px'}}>
                    <input type="file"  id= "image_path" onChange={handleChange} />
                    <button onClick={handleUpload}>Upload</button>
                    <img src={url || "http://via.placeholder.com/300"} className="photo" alt="Image uploaded" />
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                <Row className="container-login100-form-btn">
                    <Col xs lg="4">

                        <button  className="login100-form-btn" >Update Profile</button>
                    </Col>
                </Row>

            </form>
            </div>
            </div>
        </div>
    )
};
export default UpdateProfilePlanner;