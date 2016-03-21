(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "3ec084b296ca7bdfdc9169ce1ddde7106c2878d1";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

  exports.getProfile = function(repos){
    $.get('https://api.github.com/users/' + repos + '?access_token=' + apiKey).then(function(response){
      console.log(response);
      $('#showPicture').append('<img src='+ response[0].avatar_url +'>');
      $('#showFullName').append('<ul><li> Real Name: ' + response[0].name + '</li></ul>');
      $('#showEmail').append('<ul><li> Description: ' + response[0].email + '</li></ul>');
      $('#showFollowers').append('<ul><li> Repo Name: ' + response[0].followers + '</li></ul>');
      $('#showFollowing').append('<ul><li> Description: ' + response[0].following + '</li></ul>');
    })
    .fail(function(error){
      console.log(error.responseJSON.message);
    });
  };

},{"./../.env":1}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

  exports.getRepos = function(repos){
    $.get('https://api.github.com/users/' + repos + '/repos?access_token=' + apiKey).then(function(response){
      console.log(response);
      $('#picture').append('<img src='+ response[0].owner.avatar_url +'>');

      for(var i = 0; i < response.length; i++)
      {
        $('.showRepos').append('<ul><li> Repo Name: ' + response[i].full_name + '</li></ul>');
         $('.showRepos').append('<ul><li> Description: ' + response[i].description + '</li></ul>');
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };

},{"./../.env":1}],4:[function(require,module,exports){
var getProfile = require('./../js/getProfile.js').getProfile;
var getRepos = require('./../js/getRepos.js').getRepos;

$(document).ready(function(){
  $('#getProfile').submit(function(event){
  event.preventDefault();
  $('#showPicture').empty("");
  $('#showFullName').empty("");
  $('#showEmail').empty("");
  $('#showFollowers').empty("");
  $('#showFollowing').empty("");
  var repos = $('#username').val();
  getProfile(repos);
  $('#username').val("");

  });
  $('#getName').submit(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });
});

},{"./../js/getProfile.js":2,"./../js/getRepos.js":3}]},{},[4]);
