



export const teamMemberService = { 
  create,
  getAll,
  
   };



// // -----------------------------------------------------------------------------
// //     CREATE TEAM MEMBER
// // -----------------------------------------------------------------------------
function create(token,email) {

 
  console.log("-----> email: " + email);
  var body =`email=${email  }`;
 

  console.log(`[team-member-service] sending req, body: \n${  body}`);


  const requestOptions = {
    method: 'POST',
    headers: {'x-access-token':token,  'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };

  console.log("request options " +JSON.stringify(requestOptions));
  const url = "https://teammanager9.herokuapp.com/members/invite_team_member";
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((team_member_resp) => {
      console.log(`team_member-service create member resp: ${  JSON.stringify(team_member_resp)}` );

      return team_member_resp;
    })
    .catch( (error) => {
          console.log("==================> error: " + error);

    });
}// create

function getAll(token) {

    console.log("====== project-service getAll ======");


    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': token, 'Content-Type': 'application/x-www-form-urlencoded'},
    };
    const url = `https://teammanager9.herokuapp.com/members/all`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((team_member) => {
      console.log(`++++++++ project-service getAll project_resp: ${  JSON.stringify(team_member)}` );

      return team_member;
    });
}// getAll

