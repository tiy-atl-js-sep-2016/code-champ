import $ from 'jquery';
import { getUser, getRepoStats } from "./github";

function printData (data) {
  console.log(data);
}

function getRankings (event) {
  event.preventDefault();
  var req = getRepoStats("jquery", "jquery");
  req.then(printData);
  console.log("The request is away!");
}

$("#submit-button").click(getRankings);
