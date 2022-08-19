import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    client: '/unregistered',
    event: '/event',
    ourWork: '/ourWork',
    createEvent: '/createEvent',
    addYourEvent: '/addClientEvent',
    planners: '/allPlanners',
    addEventDetails: '/addEventDetails',
    updateProduct: '/updateProduct',
    deleteProduct: '/deleteProduct',
    events: '/allEvents',
    client_planner: '/addClientPlanner',
    addOurWork: '/addOurWork'
}

function getPlanners(callback) {
    let request = new Request(HOST.backend_api + endpoint.client + endpoint.planners, {
        method: 'GET',

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getEvents(callback) {
    let request = new Request(HOST.backend_api + endpoint.client + endpoint.events, {
        method: 'GET',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function addEvent(userEvent, callback){
    let request = new Request(HOST.backend_api + endpoint.createEvent + endpoint.addYourEvent , {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(userEvent)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestText(request, callback);
}


function addOurWork(userEvent, callback){
    let request = new Request(HOST.backend_api + endpoint.ourWork + endpoint.addOurWork , {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(userEvent)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestText(request, callback);
}
function addClientPlanner(user, callback){
    let request = new Request(HOST.backend_api + endpoint.createEvent + endpoint.client_planner , {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestText(request, callback);
}
function postEvent(userEvent, callback){
    let request = new Request(HOST.backend_api + endpoint.event + endpoint.addEventDetails , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(userEvent)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestText(request, callback);
}



export {
    getPlanners,
    postEvent,
    addEvent,
    getEvents,
    addClientPlanner,
    addOurWork
}