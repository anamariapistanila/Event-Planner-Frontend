import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as API_USERS from "../api/planner-api";
import { Link } from 'react-router-dom';
import ImageTable from "../../home/table.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {sendNotification} from "../../Notification/components/Notification";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${ImageTable})`,
};
function ClientsPlannerTable() {


    const [clients, setClients] = useState([]);
    const [notif, setNotif] = useState(false);
    const [show, setShow] = useState(false);
    const handleDelete = () => setShow(true);
    const handleClose = () => setShow(false);
    const [mainClients, setMainClients] = useState([]);
    useEffect(() => {
        const fetching = async () => {
            const {data} =await
        axios.get('http://localhost:8080/planner/getAllClients', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }     })
            setClients(data);
            setMainClients(data);
            console.log(data);

        }
            fetching();
    }, []);


    const handleSearchByName = (e) => {
        setClients(mainClients.filter(u => u.name.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }

    function fetchClients(){
        return API_USERS.getClients((result, status, err) => {

        });}

    function reloadAfterDelete(){
        window.location.reload(false);
        fetchClients();
    }
    function deleteClient(client){
        API_USERS.deleteClientById(client,(result, status, err) => reloadAfterDelete());
        alert("Deleted successfully");
    }


   function handleSendNotificationAccept(id) {
        const notificationRequest = {
            fromUser: localStorage.getItem("Username"),
            message: "accepted your event",
        };
        sendNotification(id, notificationRequest);
       setNotif(true);
    };
    function handleSendNotificationDeny(id) {

        console.log(id);
        const notificationRequest = {
            fromUser: localStorage.getItem("Username"),
            message: "denied your event",
        };
        sendNotification(id, notificationRequest);
        setNotif(true);
    };
    return (
        <div style={backgroundStyle}>
            {notif &&
            <Alert severity="info"  style={{width: '15%', height: '10%'}} onClose={()=>{setNotif(false)}}>
                <AlertTitle>Info</AlertTitle>
             <strong>The notification was sent successfully</strong>
            </Alert>
            }
            <br/><br/>
            <h2>Planner Clients</h2>
            <br/><br/>
                <div className='form-group col-10 col-md-6 col-lg-4'>
                    <input type="text" className='form-control shadow'
                           placeholder='Search Clients By Name' onChange={handleSearchByName} />
                </div>



            {clients.length ? (
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Name of Client</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">BirthDate</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                        <th scope="col">Accept</th>
                        <th scope="col">Deny</th>


                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(u =>
                        <tr key={u.id}>

                            <th scope="row">{u.name}</th>

                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.address}</td>
                            <td>{u.birthdate}</td>
                            <td>
                                <>
                                    <a type="button" style={{width: '25%', border: "none"}}  onClick={handleDelete}>
                                        Delete</a>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={()=>deleteClient(u.id)}>
                                                Yes
                                            </Button>
                                            <Button variant="primary" onClick={handleClose}>
                                                No
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            </td>
                            <td>

                                <Link className="txt2" to={{pathname: "/updateClient", state: {clients: u}}}>
                                 Update
                                </Link>
                            </td>
                                <td>
                                    <a type="button" style={{width: '25%', border: "none"}} onClick={()=>handleSendNotificationAccept(u.id)}>
                                     Accept
                                    </a>


                            </td>

                            <td>
                                <a type="button" style={{width: '25%', border: "none"}} onClick={()=>handleSendNotificationDeny(u.id)}>
                                    Deny
                                </a>


                            </td>



                        </tr>
                    )}
                    </tbody>
                </table>
            ) : (
                <h6 className='text-center text-info'>waiting ...</h6>
            )}

        </div>
    )
}
export default ClientsPlannerTable;