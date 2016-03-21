var apiKey = require('./../.env').apiKey;

  exports.getProfile = function(repos){
    $.get('https://api.github.com/users/' + repos + '?access_token=' + apiKey).then(function(response){
      console.log(response);
      $('#showPicture').append('<img class="img-circle" src='+ response[0].avatar_url +'>');
      $('#showFullName').append('<ul><li> Real Name: ' + response[0].name + '</li></ul>');
      $('#showEmail').append('<ul><li> Description: ' + response[0].email + '</li></ul>');
      $('#showFollowers').append('<ul><li> Repo Name: ' + response[0].followers + '</li></ul>');
      $('#showFollowing').append('<ul><li> Description: ' + response[0].following + '</li></ul>');
    })
    .fail(function(error){
      console.log(error.responseJSON.message);
    });
  };
