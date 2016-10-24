import $ from 'jquery';
import _ from 'lodash';

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
  console.log(data);
  var sorted = _.orderBy(data, ['total'], ['desc']);
  var top10 = _.take(sorted, 10).map(extractUserInfo);
  var authorRequests = top10.map(function (x) { return getUser(x.author); });
  var authorData = Promise.all(authorRequests);
  return authorData.then(function (authors) { generateResults(authors, top10); });
};

function generateResults (authors, top10) {
  for (var i = 0; i < top10.length; i++) {
    top10[i].author = authors[i];
  }

  console.log(top10);

  return top10;
};

function getRepoRanks (user, repo) {
  return getRepoStats(user, repo).then(generateRankings);
};

export { getRepoRanks };
