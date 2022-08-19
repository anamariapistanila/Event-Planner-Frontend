import {HOST} from '../../commons/hosts'
import RestApiClient from '../../commons/api/rest-client'

const endpoint = {
    login: '/login',
    users: '/users',
    getRole:'/getRoleFor/',
    getUserData:'/getUserByUsername/',
    getUserName:'/getUsername/',
    changePassword:'/changePassword/'
}


function login(credentials, callback){
    let request = new Request(HOST.backend_api + endpoint.login , {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequestLogin(request, callback);
}


function getRole (user, callback){

    let request = new Request(HOST.backend_api + endpoint.users + endpoint.getRole + user , {
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


function getUserData (user, callback){

    let request = new Request(HOST.backend_api + endpoint.users + endpoint.getUserData + user , {
        method: 'GET',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}
function getUserName (user, callback){

    let request = new Request(HOST.backend_api + endpoint.users + endpoint.getUserName + user , {
        method: 'GET',
        headers : {
            'Authorization': localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function changePassword(email, credentials, callback){

    let request = new Request(HOST.backend_api + endpoint.users + endpoint.changePassword + email , {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}


export{
    login,
    getRole,
    getUserData,
    changePassword,
    getUserName
}