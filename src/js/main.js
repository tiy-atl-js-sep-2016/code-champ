import $ from 'jquery';

import { getRepoRanks } from "./github";
import { rankingTemplate, projectTemplate } from "./templates";

var resultsBox = $(".results");

function addTotalsToPage (totals) {
  var rankings = totals.map(rankingTemplate);
  var html = projectTemplate(rankings);
  resultsBox.html(html);
};

function getRankings (event) {
  event.preventDefault();
  var userName = $("#user-name").val();
  var repoName = $("#repo-name").val();

  var results = getRepoRanks(userName, repoName);
  results.then(addTotalsToPage);
}

$("#submit-button").click(getRankings);
