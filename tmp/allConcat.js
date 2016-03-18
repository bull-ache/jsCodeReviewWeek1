var getRepos = require('./../js/github-interface.js').getRepos;

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
