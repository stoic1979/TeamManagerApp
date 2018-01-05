export const issueService = { getAll,create };


// -----------------------------------------------------------------------------
//     CREATE ISSUE
// -----------------------------------------------------------------------------
function create(token, issue_data) {
  var user = JSON.parse(localStorage.getItem('user'));
  console.log(`[issue-service] got user: ${  JSON.stringify(user)}`);
  console.log(`[issue-service] got token: ${  user.token}`);

  var body = `&project=${issue_data.project}`;
  body += `&assignee=${issue_data.assignee}`;
  body += `&summary=${issue_data.summary}`;
  body += `&description=${issue_data.description}`;
  body += `&type=${issue_data.type}`;
  body += `&priority=${issue_data.priority}`;
  body += `&status=${issue_data.status}`;
  body += `&estimated_hours=${issue_data.estimated_hours}`;
  body += `&start_date=${issue_data.start_date}`;
  body += `&end_date=${issue_data.end_date}`;
  body += `&created_at=${issue_data.created_at}`;
  body += `&updated_at=${issue_data.updated_at}`;
 

  body += '&__v=0';
  

  console.log(`[issue-service] sending req, body: \n${  body}`);


  const requestOptions = {
    method: 'POST',
    headers: {'x-access-token': token,'Content-Type': 'application/x-www-form-urlencoded'},
    body: body,
  };
  const url = "https://teammanager9.herokuapp.com/issues/add";
  return fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((issue_resp) => {
      console.log(`issue-service create issue resp: ${  JSON.stringify(issue_resp)}` );

      return issue_resp;
    })
    .catch( (error) => {
          console.log("==================> error: " + error);

    });
}// create

function getAll(token, project_id) {

    console.log("====== issue-service getAll ======");
   console.log("project_id in issue service " + project_id);

    const requestOptions = {
        method: 'GET',
        headers: {'x-access-token': token},
    };
    const url = `https://teammanager9.herokuapp.com/issues/all_by_project/${project_id}`
    return fetch(url, requestOptions)
    .then((response) => {

          console.log("+++++++ resp: " + response);

          if (!response.ok) {
            return Promise.reject(response.statusText);
          }

          return response.json();
        })
    .then((issues) => {
      console.log(`++++++++ issue-service getAll issue_resp: ${  JSON.stringify(issues)}` );

      return issues;
    });
}// getAll




