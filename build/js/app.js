(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "3ec084b296ca7bdfdc9169ce1ddde7106c2878d1";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

  exports.getRepos = function(repos){
    $.get('https://api.github.com/users/' + repos + '/repos?access_token=3ec084b296ca7bdfdc9169ce1ddde7106c2878d1').then(function(response){
      console.log(repos);

      for(var i = 0; i < response.length; i++)
      {
        $('.showRepos').append('<ul><li> Repo Name: ' + response[i].full_name + '</li></ul>');
         $('.showRepos').append('<ul><li> Description: ' + response[i].description + '</li></ul>');
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };

},{"./../.env":1}],3:[function(require,module,exports){
var getRepos = require('./../js/github-interface.js').getRepos;

$(document).ready(function(){
  $('#getName').submit(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  console.log(repos);
  getRepos(repos);
  $('#name').val(""); //this might create a problem, check later
  });
});

var apiKey = require('./../.env').apiKey;

  exports.getRepos = function(repos){
    $.get('https://api.github.com/users/' + repos + '/repos?access_token=3ec084b296ca7bdfdc9169ce1ddde7106c2878d1').then(function(response){
      console.log(repos);

      for(var i = 0; i < response.length; i++)
      {
        $('.showRepos').append('<ul><li> Repo Name: ' + response[i].full_name + '</li></ul>');
         $('.showRepos').append('<ul><li> Description: ' + response[i].description + '</li></ul>');
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };

},{"./../.env":1,"./../js/github-interface.js":2}]},{},[3]);
