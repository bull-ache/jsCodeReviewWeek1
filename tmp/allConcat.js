var getRepos = require('./../js/getRepos.js').getRepos;
var getProfile = require('./../js/getProfile.js').getProfile;

$(document).ready(function(){
  $('#getProfile').submit(function(event){
  event.preventDefault();
  $('#picture').empty("");
  $('.showRepos').empty("");
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });




  $('#getName').submit(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });


});
