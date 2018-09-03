const rp = require('request-promise');
const cheerio = require('cheerio');
var options;
const moment = require('moment');
const interval = 1000;
for(var i = 0; i < 365; i++) {
  setTimeout( function(i) {
    //Need to store last run date - so that we can run the gap
    //Store in file so that it can continue to build. 
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
          var trimmedText = a.text().trim(); 
          if ((j + 1) % 3 === 0 ) { 
            if (a.text().trim().indexOf(" to ") > 0) {
              var c = trimmedText.split(" ");
              b = b + c[0] + ", " + c[2];
            }
            else {
              b = b + trimmedText + ", " + trimmedText; 
            }
            console.log(b);
            b = currentDate + ", ";
          } else {
            b = b + trimmedText + ", ";
          }
        });
    })
    .catch(function(error) {
      //console.log("crawl failed with no data for date: " + currentDate);
    });
  }, interval * i, i);
}
