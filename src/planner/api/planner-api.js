import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    planner: '/planner',
    client: '/unregistered',
    addEvent:'/addEventPlanner',
    deleteEvent: '/deleteEvent',
    updateEvent:'/updateEvent/',
    getEvents: '/getAllEvents',
    getClients: '/getAllClients',
    updateClient:'/updateClient/',
    deleteClient: '/deleteClient',
    updateProfile:'/updateProfile',
    updateProfileClient:'/updateProfile',
    addEventPlanner: '/addEventByPlanner'

};


function getEvents(callback) {
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.getEvents, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getClients(callback) {
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.getClients, {
        method: 'GET',
        headers : {
            'Authorization': 'Bearer ' + window.localStorage.getItem("token")
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}


function postEvent(userEvent, callback){
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.addEvent , {
        method: 'POST',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userEvent)

    });

    console.log(JSON.stringify(userEvent))
    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function deleteEventById(id,callback){
    let request = new Request(HOST.backend_api  +endpoint.planner +endpoint.deleteEvent +'/' + id, {
        method: 'DELETE',
        headers : {
            'Authorization': localStorage.getItem('token')
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deleteClientById( params, callback){
    let request = new Request(HOST.backend_api  +endpoint.planner +endpoint.deleteClient  +'/' + params, {
        method: 'DELETE',
        headers : {
            'Authorization': localStorage.getItem('token')
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updateEvent(id, params, callback) {
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.updateEvent+ id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(params)

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function updateProfile( params, callback) {
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.updateProfile, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(params)

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function updateProfileClient( params, callback) {
    let request = new Request(HOST.backend_api + endpoint.client + endpoint.updateProfileClient, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(params)

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function updateClient(id, params, callback) {
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.updateClient+ id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(params)

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function addEventPlanner(userEvent, callback){
    let request = new Request(HOST.backend_api + endpoint.planner + endpoint.addEventPlanner , {
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


export{
    getEvents,
    postEvent,
    deleteEventById,
    updateEvent,
    getClients,
    updateClient,
    deleteClientById,
    updateProfile,
    updateProfileClient,
    addEventPlanner
}