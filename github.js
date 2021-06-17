// import dotenv
require('dotenv').config();
// import Octokit
const { Octokit } = require('@octokit/rest');
// import child_process
const { exec } = require('child_process');

// creates GitHub token.
let token = process.env.GIT_TOKEN;
// initialize octokit with token
const octokit = new Octokit({
  auth: `token ${process.env.GIT_TOKEN}`,
});

// octokit options variables
const username = 'robertop96';
let per_page = 100;

//api call via octokit
octokit.rest.repos
  .listForAuthenticatedUser({
    //options
    username,
    per_page,
  })
  .then((repos) => {
    const repositoryList = [];
    // Filters repositories that don't contain certain word.
    let studentRepositories = repos.data.filter((obj) => obj.name.includes('ravel'));
    studentRepositories.map((repository) => {
      // Creates and pushes student object.
      let studentInfo = {};
      studentInfo.url = repository.ssh_url;
      studentInfo.name = repository.owner.login;
      repositoryList.push(studentInfo);
    });
    // Executes command in terminal for each student object.
    repositoryList.map((student) => {
      // child_process
      exec(
        // Reset directory location, creates student directory and clones project inside.
        ` mkdir -p repositories && cd repositories/ && mkdir ${student.name}-travelsite && cd ${student.name}-travelsite/ && git clone ${student.url}`,
        (error, stdout, stderr) => {
          if (error) {
            console.log(`error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
        }
      );
    });
  })
  .catch((err) => console.log(err));
