var getRepos = require('./../js/github-interface.js').getRepos;

$(document).ready(function(){
  $('#getName').submit(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  getRepos(repos);
  $('#name').val("");
  });
});
