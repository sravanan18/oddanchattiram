const rp = require('request-promise');
const cheerio = require('cheerio');
var options;
const moment = require('moment');
for(var i = 0; i < 600; i++) {
var currentDate = moment(new Date()).add(-(i), 'days').format('D-MM-YYYY');
console.log(currentDate);
//console.log(yesterday);
var requestUrl = "https://oddanchatramvegetablemarket.net/oddanchatram-vegetable-market-price-details-" + currentDate + "/";
console.log(requestUrl);
/*
options = {
  uri: requestUrl,
  transform: function (body) {
    return cheerio.load(body);
  }
};
rp(requestUrl, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var b = "";
    var counter = 1;
    $('td').each(function(i, element){
      var a = $(this);
       b = b + a.text().trim().split("/")[0] + ", ";
       //create document for database
       if ((i + 1) % 3 === 0 ) { 
         console.log(b);
         //Store in database
         b = "";
       }
    });
  }
});*/
}
//.catch(function(err){
 // console.log(requestUrl + " " + " crawling failed");
//});
