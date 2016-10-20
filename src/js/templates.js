function rankingTemplate (userData) {
  // For an Individual User
  return `
     <li class="ranking">
       <p>
         <a href="https://github.com/users/${userData.author}">${userData.author}</a>
         has made ${userData.total} commits, adding ${userData.contributions.added}
         lines of code, and deleted ${userData.contributions.deleted} lines of code.
       </p>
     </li>
    `;
};

function projectTemplate (rankingsHtml) {
  return `
    <h2 class="project">Hacker Rankings</h2>
    <ol class="rankings">
      ${rankingsHtml.join("")}
    </ol>
    `;
};

export { rankingTemplate, projectTemplate };
