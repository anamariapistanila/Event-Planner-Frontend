import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    admin: '/admin',
    getClients: '/allClients',
    getPlanners: '/allPlanners',
    deletePlanner: '/deletePlanner',
    deleteClient: '/deleteClient',
    updatePlanner: '/updatePlanner/'

}

function getClients(callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.getClients, {
        method: 'GET',

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPlanners(callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.getPlanners, {
        method: 'GET',

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}
function deletePlannerById( params, callback){
    let request = new Request(HOST.backend_api  +endpoint.admin +endpoint.deletePlanner  +'/' + params, {
        method: 'DELETE',
        headers : {
            'Authorization': localStorage.getItem('token')
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteClientById( params, callback){
    let request = new Request(HOST.backend_api  +endpoint.admin +endpoint.deleteClient  +'/' + params, {
        method: 'DELETE',
        headers : {
            'Authorization': localStorage.getItem('token')
        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function updatePlanner( id,params, callback) {
    let request = new Request(HOST.backend_api + endpoint.admin + endpoint.updatePlanner + id, {
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

export {
    getClients,
    getPlanners,
    deletePlannerById,
    deleteClientById,
    updatePlanner

}