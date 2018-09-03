const rp = require('request-promise');
const cheerio = require('cheerio');
var options;
const moment = require('moment');
for(var i = 0; i < 50; i++) {
  (function(i) {
    var currentDate = moment(new Date()).add(-(i), 'days').format('D-MM-YYYY');
    var requestUrl = "https://oddanchatramvegetablemarket.net/oddanchatram-vegetable-market-price-details-" + currentDate + "/";
    options = {
      uri: requestUrl,
      transform: function (body) {
        return cheerio.load(body);
      }
    };
    rp(options)
      .then(function($) {
        var b = currentDate + ", ";
        var counter = 1;
        $('td').each(function(j, element) {
          var a = $(this);
          b = b + a.text().trim(); 
          //create document for database
          if ((j + 1) % 3 === 0 ) { 
            console.log(b);
            //Store in database
            b = currentDate + ", ";
          } else {
            b = b + ", ";
          }
        });
    })
    .catch(function(error) {
      //console.log("crawl failed with no data for date: " + currentDate);
    });
  })(i);
}
