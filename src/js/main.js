import $ from 'jquery';
import { getUser, getRepoStats } from "./github";

function sortByTotal (a, b) {
  if (a.total > b.total) {
    return -1;
  } else if (a.total < b.total) {
    return 1;
  } else {
    return 0;
  }
};

function generateRankings (data) {
  var sortedData = data.sort(sortByTotal);
  var top10 = sortedData.slice(0, 10);
  console.log(top10);
};

function getRankings (event) {
  event.preventDefault();
  var userName = $("#user-name").val();
  var repoName = $("#repo-name").val();

  var req = getRepoStats(userName, repoName);
  req.then(generateRankings);
}

$("#submit-button").click(getRankings);

// console.log($("#user-name"));

// getRepoStats("jquery", "jquery").then(console.log);
