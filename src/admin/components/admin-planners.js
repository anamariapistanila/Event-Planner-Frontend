import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as API_ADMIN from "../../admin/api/admin-api";
import { Link } from 'react-router-dom';
import ImageTable from "../../home/table.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "992px",
    backgroundImage: `url(${ImageTable})`,
};
function AdminPlanners() {


    const [planners, setPlanners] = useState([]);

    const [show, setShow] = useState(false);
    const handleDelete = () => setShow(true);
    const handleClose = () => setShow(false);
    const [mainPlanners, setMainPlanners] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/admin/allPlanners').then(res => {

            setPlanners(res.data);
            setMainPlanners(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const handleSearchByName = (e) => {
        setPlanners(mainPlanners.filter(u => u.name.toLowerCase()
            .includes(e.target.value.toLowerCase())
        ));
        console.log(e.target.value);
    }

    function fetchPlanners(){
        return API_ADMIN.getPlanners((result, status, err) => {
            console.log(result.id);
            localStorage.setItem("PlannerId",result.id);

        });}

    function reloadAfterDelete(){
        window.location.reload(false);
        fetchPlanners();
    }
    function deletePlanner(planner){
        API_ADMIN.deletePlannerById(planner,(result, status, err) => reloadAfterDelete());
        alert("Deleted successfully");
    }




    return (
        <div style={backgroundStyle}>
            <br/><br/>
            <h2>Admin Planners</h2>
            <br/><br/>
            <div className='form-group col-10 col-md-6 col-lg-4'>
                <input type="text" className='form-control shadow'
                       placeholder='Search Planners By Name' onChange={handleSearchByName} />
            </div>



            {planners.length ? (
                <table className='table'>
                    <thead>
                    <tr>
                        <th scope="col">Name of Planner</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type of planner</th>
                        <th scope="col"></th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>


                    </tr>
                    </thead>
                    <tbody>
                    {planners.map(u =>
                        <tr key={u.id}>

                            <th scope="row">{u.name}</th>

                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td>{u.address}</td>
                            <td>{u.type_of_planner}</td>
                            <td>
                                <>
                                    <a type="button" style={{width: '25%', border: "none"}}  onClick={handleDelete}>
                                        Delete</a>
                                    <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure you want to delete?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={()=>deletePlanner(u.id)}>
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

                                <Link className="txt2" to={{pathname: "/updatePlannerAdmin", state: {planners:u} }}>
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
export default AdminPlanners;