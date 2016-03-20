var getRepos = require('./../js/getRepos.js').getRepos;

$(document).ready(function(){
  $('#getName').submit(function(event){
  event.preventDefault();
  $('#picture').empty("");
  $('.showRepos').empty("");
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });


});
