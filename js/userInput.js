var getRepos = require('./../js/github-request.js').getRepos;

$(document).ready(function(){
  $('#search').click(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val(""); //this might create a problem, check later
  });
});
