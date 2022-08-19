import React, {useEffect, useState} from 'react'
import logo from './commons/images/icon.png';
import useStateRef from "react-usestateref";
import {Badge, List, notification, Popover,} from "antd";
import "antd/dist/antd.css";
import {
    Button,
    Nav,
    Navbar,
    NavbarBrand
} from 'reactstrap';
import {withRouter} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import tableIcons from "./MaterialTableIcons";

const vertical_center = {
    background: 'white',
    border: 'none',
    outline:'none',
    color: 'black',
    margin: '0',
    position: 'absolute',
    top: '20%',
    width: '100px',
    height: '40px',
};

function NavigationBar(){

    const [notifications, setNotifications] = useState([]);
    const [newNotifications, setNewNotifications, newNotificationsRef] = useStateRef([]);
    const [iconClass, setIconClass] = useState('');
    const user = localStorage.getItem("UserId");
   function handleLogout()  {
        localStorage.clear();
        window.location.href = "/login";
    };

    function handlePlanner(){
        window.location.href="/plannerCards";
    }

    function handleWork(){
        window.location.href="/ourWorkDashboard";
    }
    function handlePlannerWork(){
        window.location.href="/ourWork";
    }

    function handleDirections(){
        window.location.href="/mapContainer";
    }

    function handleContact(){
        window.location.href="/contactUs";
    }
    function handleUpdateProfile(){
        window.location.href="/updateProfilePlanner";
    }
    function handleUpdateProfileClient(){
        window.location.href="/updateProfileClient";
    }

    function  handleManagement(){
        window.location.href="/planner";
    }
    function handleManagementAdmin(){
        window.location.href="/admin";
    }
    function handleFAQ(){
        window.location.href="/faq";
    }

    function handleStatistics(){
        window.location.href="/pieChart";
    }

    const getNotifications = () => {
        fetch("http://localhost:8080/notification/" + user, {})
            .then(response => response.json())
            .then(response => {
                setNotifications(response);
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        initListener();
        setIconClass("icon-dimmed");
        getNotifications();
    }, [])

    const initListener = () => {
        const eventSource = new EventSource("http://localhost:8080/notification/subscription");
        eventSource.onerror = (e) => {
            if (e.readyState === EventSource.CLOSED) {
                console.log("close");
            } else {
                console.log(e);
            }
            initListener();
        };
        eventSource.addEventListener(
            user,
            handleServerEvent,
            false
        );
    };
    const handleServerEvent = (e) => {
        const json = JSON.parse(e.data);
        console.log(json);
        let newNotifi = newNotificationsRef.current;
        newNotifi.unshift({
            from: json.fromUser,
            message: json.message,
            isRead: false,
        });
        console.log(newNotifi);
        setNewNotifications(newNotifi);

        notification.config({
            placement: "bottomLeft",
        });
        notification.open({
            message: (
                <div>
                    <b>{json.fromUser}</b> {json.message}
                </div>
            ),
        });
    };

    const handleOnClick = () => {
        let notifi = notifications;
        notifi = newNotificationsRef.current.concat(notifi);
        setNewNotifications([]);
        setNotifications(notifi.sort((a, b) => {
            return (new Date(b.createdAt) - new Date(a.createdAt))
        }));

    };
       return( <div>
            <Navbar color="pink" light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} width={"50"}
                         height={"35"} style={{marginLeft: '15px'}}/>
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
                </Nav>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: (localStorage.getItem("role") !== ("Client") && (localStorage.getItem("role") === ("Planner") || localStorage.getItem("role") === ("Admin"))) ? 'none':'block'}}
                        onClick={handleWork}> Our Work </Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: (localStorage.getItem("role") === ("Client") && (localStorage.getItem("role") === ("Planner") || localStorage.getItem("role") === ("Admin"))) ? 'none':'block'}}
                        onClick={handleStatistics}> Statistics </Button>



                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: (localStorage.getItem("role") === ("Client")  || localStorage.getItem("role") === ("Planner") || localStorage.getItem("role") === ("Admin")) ? 'none':'block'}}
                        onClick={handleContact}> Contact Us </Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: (localStorage.getItem("role") === ("Client")  || localStorage.getItem("role") === ("Planner") || localStorage.getItem("role") === ("Admin")) ? 'none':'block'}}
                        onClick={handleFAQ}> FAQ </Button>


                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: (localStorage.getItem("role") === ("Client")  || localStorage.getItem("role") === ("Planner")|| localStorage.getItem("role") === ("Admin") ) ? 'none':'block'}}
                        onClick={handleDirections}> Directions </Button>



                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("role") !== ("Planner") ? 'none':'block'}}
                        onClick={handlePlannerWork}> Add Our Work </Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("role") !== ("Planner")  ? 'none':'block'}}
                        onClick={handleManagement}> Management </Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("role") !== ("Admin")  ? 'none':'block'}}
                        onClick={handleManagementAdmin}> Management Admin </Button>


                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display:  localStorage.getItem("role") !== ("Planner")  ? 'none':'block'}}
                        onClick={handleUpdateProfile}> Update Profile</Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("role") !== ("Client") ? 'none':'block'}}
                        onClick={handlePlanner}> Our Planners </Button>


                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display:  localStorage.getItem("role") !== ("Client")  ? 'none':'block'}}
                        onClick={handleUpdateProfileClient}> Update Profile</Button>

                <a href="#" onClick={handleOnClick}>
                    <Popover
                        trigger="click"
                        content={<div style={{
                            "width": "400px",
                            "height": "400px",
                            "overflow": "auto",
                            "padding": "20px",
                            "backgroundColor" : "white"
                        }}>
                            <List
                                dataSource={notifications}
                                renderItem={(notification) => (
                                    <List.Item

                                    >
                              <span style={{padding: "2px 20px"}}>
                                  {notification.createdAt.toLocaleString().substr(8, 2) + "/" +
                                  notification.createdAt.toLocaleString().substr(5, 2) + " " +
                                  notification.createdAt.toLocaleString().substr(11, 5)}<br/>{notification.fromUser}  {notification.message}
                                        </span>
                                    </List.Item>
                                )}
                            />
                        </div>}
                    >
                        <IconButton style={{marginLeft: "-15px"}}>
                            <tableIcons.Notification/>
                        </IconButton>

                    </Popover>
                </a>


                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("token") !== null ? 'none':'block'}}
                        href={"/login"}> Login </Button>

                <Button color="transparent" style={{vertical_center, float: 'right', marginRight: '15px', display: localStorage.getItem("token") === null ? 'none':'block'}}
                        onClick={handleLogout}> Logout </Button>


            </Navbar>

        </div>
       )};


export default withRouter(NavigationBar);
