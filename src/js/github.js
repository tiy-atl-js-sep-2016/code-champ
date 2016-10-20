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
  var sorted = _.orderBy(data, ['total'], ['desc']);
  var top10 = _.take(sorted, 10);
  var totals = top10.map(extractUserInfo);
  return totals;
};

function getRepoRanks (user, repo) {
  return getRepoStats(user, repo).then(generateRankings);
};

export { getRepoRanks };
