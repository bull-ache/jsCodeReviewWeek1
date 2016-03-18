var apiKey = require('./../.env').apiKey;

  exports.getRepos = function(repos){
    $.get('https://api.github.com/users/' + gitName + '/repos?access_token=' + apiKey).then(function(response){
      console.log(response);

      for(var i = 0; i < response.length; i++)
      {
        $('.showRepos').append('<ul><li> Repo Name: ' + response[i].name + '</li></ul>');
         $('.showRepos').append('<ul><li> Description: ' + response[i].description + '</li></ul>');
      }
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };
