var userInput = require('./../js/userInput.js').userInput;








    exports.getRepos = function(){
      $.get('https://api.github.com/users/daneden?access_token=' + apiKey).then(function(response){
        console.log(response);
      }).fail(function(error){
        console.log(error.responseJSON.message);
      });
    };







      $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + zipCode + '&proximity_square=5&stolen_after=1451610062', function(response) {
      console.log(response);
      for(var i = 0; i < response.bikes.length; i++) {
        $('.showBikes').append(response.bikes[i].title);
        $('.showBikes').append('<ul><li>'+ response.bikes[i].stolen_location + '</li></ul>');
        $('#address').val("'" + response.bikes[i].stolen_location + "'");
        Address();
      }
    });
  });
});
