import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as API_ADMIN from "../../admin/api/admin-api";
import { Link } from 'react-router-dom';
import ImageTable from "../../home/table.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../../planner/api/planner-api";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${ImageTable})`,
};
function AdminClients() {


    const [clients, setClients] = useState([]);

    const [show, setShow] = useState(false);
    const handleDelete = () => setShow(true);
    const handleClose = () => setShow(false);
    const [mainClients, setMainClients] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/admin/allClients').then(res => {
            setClients(res.data);
            setMainClients(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);


    const handleSearchByName = (e) => {
        setClients(mainClients.filter(u => u.name.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }

    function fetchClients(){
        return API_ADMIN.getClients((result, status, err) => {

        });}

    function reloadAfterDelete(){
        window.location.reload(false);
        fetchClients();
    }
    function deleteClient(client){
        API_ADMIN.deleteClientById(client,(result, status, err) => reloadAfterDelete());
        alert("Deleted successfully");
    }



    return (
        <div style={backgroundStyle}>
            <br/><br/>
            <h2>Admin Clients</h2>
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

                                <Link className="txt2" to={{pathname: "/updateClient", state: {clients:u} }}>
                                    Update
                                </Link>
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
export default AdminClients;