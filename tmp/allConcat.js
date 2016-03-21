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
  $('#picture').empty("");
  $('.showRepos').empty("");
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });
});
