import $ from 'jquery';

import { getRepoRanks } from "./github";
import { projectTemplate } from "./templates";

var resultsBox = $(".results");

function addTotalsToPage (totals) {
  var html = projectTemplate(totals);
  resultsBox.html(html);
};

function getRankings (event) {
  event.preventDefault();
  var userName = $("#user-name").val();
  var repoName = $("#repo-name").val();

  var results = getRepoRanks(userName, repoName);
  results.then(addTotalsToPage);
};

$("#submit-button").click(getRankings);
