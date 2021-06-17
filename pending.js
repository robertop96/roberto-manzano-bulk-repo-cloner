// let run = true;
// let page = 1;
// let per_page = 30;
// while (run) {
//   octokit.rest.repos
//     .listForAuthenticatedUser({
//       username,
//       page,
//       per_page,
//     })
//     .then((repos) => {
//       if (repos.data.length < 20) {
//         run = false;
//         console.log('BINGO');
//       }
//       const urls = [];
//       let repositories = repos.data.filter((obj) => obj.name.includes('travel'));
//       repositories.map((repos) => {
//         urls.push(repos.clone_url);
//       });
//       console.log(urls);
//     })
//     .catch((err) => console.log(err));
//   page++;
// }
