import $ from 'jquery';
import _ from 'lodash';
import { getUser, getRepoStats } from "./github";

var resultsBox = $(".results");

function extractUserInfo (user) {
  var contributions = { added: 0, deleted: 0, commits: 0 };

  var answers = user.weeks.forEach(function (week) {
    contributions.added += week.a;
    contributions.deleted += week.d;
    contributions.commits += week.c;
  });

  return {
    author: user.author.login,
    total: user.total,
    contributions: contributions
  };
};

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

function generateRankings (data) {
  var sorted = _.orderBy(data, ['total'], ['desc']);
  var top10 = _.take(sorted, 10);
  var totals = top10.map(extractUserInfo);
  return totals;
};

function addTotalsToPage (totals) {
  var rankings = totals.map(rankingTemplate);
  var html = projectTemplate(rankings);
  resultsBox.html(html);
};

function getRankings (event) {
  event.preventDefault();
  var userName = $("#user-name").val();
  var repoName = $("#repo-name").val();

  var req = getRepoStats(userName, repoName);
  var totals = req.then(generateRankings);
  totals.then(addTotalsToPage);

  // console.log("THIS HAPPENS FIRST");
  // foo();
}

function foo () {
  console.log("we've moved on to new tasks");
};

$("#submit-button").click(getRankings);

// console.log($("#user-name"));

// getRepoStats("jquery", "jquery").then(console.log);
