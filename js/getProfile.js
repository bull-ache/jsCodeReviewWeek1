var apiKey = require('./../.env').apiKey;

  exports.getProfile = function(repos){
    $.get('https://api.github.com/users/' + repos + '?access_token=' + apiKey).then(function(response){
      console.log(response);
      $('.showPicture').append('<img src='+ response[0].owner.avatar_url +'>');
      $('.showFullName').append('<ul><li> Real Name: ' + response[i].name + '</li></ul>');
      $('.showEmail').append('<ul><li> Description: ' + response[i].email + '</li></ul>');
      $('.showFollowers').append('<ul><li> Repo Name: ' + response[i].followers + '</li></ul>');
      $('.showFollowing').append('<ul><li> Description: ' + response[i].following + '</li></ul>');
    }).fail(function(error){
      console.log(error.responseJSON.message);
    });
  };
