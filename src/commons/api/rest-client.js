function performRequest(request, callback){
    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    response.json().then(json => callback(json, response.status,null));
                }
                else {
                    response.json().then(err => callback(null, response.status,  err));
                }
            })
        .catch(function (err) {
            callback(null, 1, err)
        });
}
function performRequestRegister(request, callback){
    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    response.json().then(json => callback(json, response.status,null));
                }
                else {
                    response.json().then(err => callback(null, response.status,  err));
                    alert("User already exists");
                    window.location.reload(false);
                }
            })
        .catch(function (err) {
            callback(null, 1, err)
        });
}
function performRequestLogin(request, callback){
    fetch(request)
        .then(
            function(response) {
                localStorage.clear()
                if (response.ok) {
                    console.log(response.headers.get('Authorization'));
                    response.headers.get('Authorization')
                    localStorage.setItem('token',  response.headers.get('Authorization'));
                    response.then(callback(null, response.status,null));
                }
                if(response.ok === false){
                    console.log("User not found");
                    alert("User Not Found");
                    response.then(callback(null, response.status,null));
                }
                else {
                    response.json().then(err => callback(null, response.status,  err));
                }
            })
        .catch(function (err) {
            callback(null, 1, err)
        });
}

function performRequestText(request, callback){

    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    response.text().then(json => callback(json, response.status,null));
                }
                else {
                    response.text().then(err => callback(null, response.status,  err));
                }
            })
        .catch(function (err) {
            callback(null, 1, err)
        });
}

module.exports = {
    performRequest,
    performRequestLogin,
    performRequestText,
    performRequestRegister


};
