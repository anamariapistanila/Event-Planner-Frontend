import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    client: '/client',
    event: '/createEvent',
    ourWork: '/ourWork',
    addYourEvent: '/addClientEvent',
    events: '/allEvents',
    client_planner: '/addClientPlanner',
    addOurWork: '/addOurWork'
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
    let request = new Request(HOST.backend_api + endpoint.event + endpoint.addYourEvent , {
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
    let request = new Request(HOST.backend_api + endpoint.event + endpoint.client_planner , {
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



export {
    addEvent,
    getEvents,
    addClientPlanner,
    addOurWork
}