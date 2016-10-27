function rankingTemplate (userData) {
  // For an Individual User
  return `
     <li class="ranking">
       <p>
         <img src="${userData.author.avatar_url}"> works for ${userData.author.company}
         in ${userData.author.location} and lives on the web at ${userData.author.blog}.
         <a href="https://github.com/users/${userData.author.login}">They</a> have
         made ${userData.total} commits, adding ${userData.contributions.added}
         lines of code, and deleted ${userData.contributions.deleted} lines of code.
       </p>
     </li>
    `;
};

function projectTemplate (totals) {
  var rankings = totals.map(rankingTemplate);
  return `
    <h2 class="project">Hacker Rankings</h2>
    <ol class="rankings">
      ${rankings.join("")}
    </ol>
    `;
};

export { projectTemplate };
