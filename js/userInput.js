var getRepo = require('./../js/github-request.js').getRepo;

$(document).ready(function(){
  $('#search').click(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });
});
