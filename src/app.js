import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import LoginContainer from "./login/login-container";
import RegisterContainer from "./register/register-container";
import PlannersCards from "./client/PlannersCards";
import PlannerContainer from "./planner/planner-container";

import ContactUs from "./home/ContactUs";
import MapContainer from "./home/MapContainer";
import OurWork from "./home/OurWork";


import UpdateEventPlanner from "./planner/components/UpdateEventPlanner";
import UpdateProfileClient from "./client/UpdateProfileClient";
import CreateYourEvent from "./client/CreateYourEvent";
import EventsTablePlanner from "./planner/components/eventsTablePlanner";
import AddWorkEvent from "./planner/components/addWorkEvent";
import UpdateProfilePlanner from "./planner/components/UpdateProfilePlanner";
import ClientsPlannerTable from "./planner/components/clientsPlannerTable";
import UpdateClientPlanner from "./planner/components/UpdateClientPlanner";
import AddEventByPlanner from "./planner/components/AddEventByPlanner";

import AddCommentClient from "./comments/components/AddCommentClient";
import AddDetailsEvent from "./planner/components/AddDetailsEvent";
import GetDetailsEvent from "./comments/components/getDetailsEvent";
import FAQApp from "./home/FAQApp";
import AdminClients from "./admin/components/admin-clients";
import AdminPage from "./admin/components/admin-page";
import AdminPlanners from "./admin/components/admin-planners";
import UpdatePlannerAdmin from "./admin/components/UpdatePlannerAdmin";
import {PieChart} from "@mui/icons-material";
import PieChartEvents from "./chart/PieChartEvents";






class App extends React.Component {

    render() {
        return (
            <div className={styles.back}>

                <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/faq'
                            render={() => <FAQApp/>}
                        />


                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <LoginContainer/>}
                        />

                        <Route
                            exact
                            path='/register'
                            render={() => <RegisterContainer/>}
                        />

                        <Route
                            exact
                            path='/plannerCards'
                            render={() => <PlannersCards/>}
                        />


                        <Route
                            exact
                            path='/contactUs'
                            render={() => <ContactUs/>}
                        />
                        
                        <Route
                            path='/createYourEvent'>
                            { <CreateYourEvent/>}</Route>
                        />


                        <Route
                            exact
                            path='/mapContainer'
                            render={() => <MapContainer/>}
                        />


                        <Route
                            exact
                            path='/planner'
                            render={() => <PlannerContainer/>}
                        />

                        <Route
                            exact
                            path='/updateEvent'
                            render={() => <UpdateEventPlanner/>}
                        />
                        <Route
                            exact
                            path='/addEventByPlanner'
                            render={() => <AddEventByPlanner/>}
                        />
                        <Route
                            exact
                            path='/updateClient'
                            render={() => <UpdateClientPlanner/>}
                        />

                        <Route
                            exact
                            path='/clients'
                            render={() => <ClientsPlannerTable/>}
                        />

                        <Route
                            exact
                            path='/events'
                            render={() => <EventsTablePlanner/>}
                        />

                        <Route
                            exact
                            path='/ourWork'
                            render={() => <AddWorkEvent/>}
                        />
                        <Route
                            exact
                            path='/ourWorkDashboard'
                            render={() => <OurWork/>}
                        />

                        <Route
                            exact
                            path='/addCommentClient'
                            render={() => <AddCommentClient/>}
                        />

                        <Route
                            exact
                            path='/addDetailsEvent'
                            render={() => <AddDetailsEvent/>}
                        />




                        <Route
                            exact
                            path='/getDetailsEvent'
                            render={() => <GetDetailsEvent/>}
                        />
                        <Route
                            exact
                            path='/updateProfilePlanner'
                            render={() => <UpdateProfilePlanner/>}
                        />
                        <Route
                            exact
                            path='/updateProfileClient'
                            render={() => <UpdateProfileClient/>}
                        />

                        <Route
                            exact
                            path='/clientsAdmin'
                            render={() => <AdminClients/>}
                        />

                        <Route
                            exact
                            path='/planners'
                            render={() => <AdminPlanners/>}
                        />

                        <Route
                            exact
                            path='/admin'
                            render={() => <AdminPage/>}
                        />
                        <Route
                            exact
                            path='/updatePlannerAdmin'
                            render={() => <UpdatePlannerAdmin/>}
                        />
                        <Route
                            exact
                            path='/pieChart'
                            render={() => <PieChartEvents/>}
                        />
                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
