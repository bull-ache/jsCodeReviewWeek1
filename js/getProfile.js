var apiKey = require('./../.env').apiKey;

  exports.getProfile = function(repos){
    $.get('https://api.github.com/users/' + repos + '?access_token=' + apiKey).then(function(response){
      console.log(response);
      $('#showPicture').append('<img class="img-circle" src='+ response.avatar_url +'>');
      $('#showFullName').append('<ul><li> Real Name: ' + response.name + '</li></ul>');
      $('#showEmail').append('<ul><li> Description: ' + response.email + '</li></ul>');
      $('#showFollowers').append('<ul><li> Followers: ' + response.followers + '</li></ul>');
      $('#showFollowing').append('<ul><li> Following: ' + response.following + '</li></ul>');
    })
    .fail(function(error){
      console.log(error.responseJSON.message);
    });
  };
