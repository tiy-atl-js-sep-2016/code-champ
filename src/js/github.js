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
  var top10 = _.take(sorted, 10).map(extractUserInfo);
  return top10;
};

function addAuthorDetails (contributor) {
  var userData = getUser(contributor.author);
  return userData.then(function (data) {
    contributor.author = data;
    return contributor;
  });
}

function finalizeContributors (rankings) {
  var results = rankings.map(addAuthorDetails);
  return Promise.all(results);
};

function getRepoRanks (user, repo) {
  var stats = getRepoStats(user, repo);
  var rankings = stats.then(generateRankings);
  return rankings.then(finalizeContributors);
};

export { getRepoRanks };
