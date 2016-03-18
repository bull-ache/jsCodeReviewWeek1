var getRepos = require('./../js/github-interface.js').getRepos;

$(document).ready(function(){
  $('#getName').submit(function(event){
  event.preventDefault();
  var repos = $('#name').val();
  console.log(repos);
  getRepos(repos);
  // $('#name').val(""); //this might create a problem, check later
  });
});
