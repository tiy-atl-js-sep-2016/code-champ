import $ from 'jquery';
import GH_TOKEN from './token';

var GH_API = "https://api.github.com";

$.ajaxSetup({
  headers: {
    Authorization: `token ${GH_TOKEN}`
  }
});

function getRepoStats (user, repo) {
  return $.ajax({
    url: `${GH_API}/repos/${user}/${repo}/stats/contributors`
  });
};

function getUser (user) {
  return $.ajax({
    url: `${GH_API}/users/${user}`
  });
};
