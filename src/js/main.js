import $ from 'jquery';
import _ from 'lodash';
import { getUser, getRepoStats } from "./github";

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

function generateRankings (data) {
  var sorted = _.orderBy(data, ['total'], ['desc']);
  var top10 = _.take(sorted, 10);
  var totals = top10.map(extractUserInfo);
  return totals;
};

function getRankings (event) {
  event.preventDefault();
  var userName = $("#user-name").val();
  var repoName = $("#repo-name").val();

  var req = getRepoStats(userName, repoName);
  var totals = req.then(generateRankings);
  totals.then(console.log);

  // console.log("THIS HAPPENS FIRST");
  // foo();
}

function foo () {
  console.log("we've moved on to new tasks");
};

$("#submit-button").click(getRankings);

// console.log($("#user-name"));

// getRepoStats("jquery", "jquery").then(console.log);
