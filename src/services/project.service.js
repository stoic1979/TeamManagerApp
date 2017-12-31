export const projectService = { getAll };

/*
function _getToken() {
  var user = JSON.parse(localStorage.getItem('user'));
  return user.token;
}
*/

import getToken from "../prefs";

function getAll(token) {

    //var token = getToken()

    

    console.log("====== project-service getAll: token = " + token);

    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': token},
    };
    const url = "https://teammanager9.herokuapp.com/projects/all";
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ projectService resp: " + JSON.stringify(response) );

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((projects) => {
      console.log(`++++++++ project-service getAll project_resp: ${  JSON.stringify(projects)}` );

      return projects;
    });
}// getAll




