const rp = require('request-promise');
const cheerio = require('cheerio');
const moment = require('moment');
var todayDate = moment().format('D-MM-YYYY');
var yesterday = moment(new Date()).add(-1, 'days').format('D-MM-YYYY');
console.log(todayDate);
console.log(yesterday);
var requestUrl = "https://oddanchatramvegetablemarket.net/oddanchatram-vegetable-market-price-details-" + todayDate + "/";
console.log(requestUrl);
rp(requestUrl)
  .then(function (error, response, html) {
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
})
.catch(function(err){
  console.log(requestUrl + " " + " crawling failed");
});
