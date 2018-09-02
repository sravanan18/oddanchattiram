const rp = require('request-promise');
const cheerio = require('cheerio');
var options;
const moment = require('moment');
for(var i = 0; i < 600; i++) {
  (function(i) {
  var currentDate = moment(new Date()).add(-(i), 'days').format('D-MM-YYYY');
  //console.log(currentDate);
  //currentDate = moment(new Date()).add(-1, 'days').format('D-MM-YYYY');
  //console.log(currentDate);
  //console.log(yesterday);
  var requestUrl = "https://oddanchatramvegetablemarket.net/oddanchatram-vegetable-market-price-details-" + currentDate + "/";
  console.log(requestUrl);
  options = {
    uri: requestUrl,
    transform: function (body) {
      return cheerio.load(body);
    }
  };
  rp(requestUrl, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
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
    } else {
      console.log(" No data for this date");
    }
  });
})(i);
}
//.catch(function(err){
 // console.log(requestUrl + " " + " crawling failed");
//});
