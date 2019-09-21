const cron = require('node-cron');

const test = require("./src/index")
const { db } = require("./src/db")

// update the db each hours
cron.schedule(' 0 * * * * *', async () => {
  
  const fetch = require('node-fetch');
  //Fetch fuction
  async function getFieldAvailability( startDate , endDate, roomID = "2163" ) {
    const response = await fetch("http://ems.drexel.edu/ServerApi.aspx/GetLocationDetailsAvailability",
      {"credentials":"include",
      "headers":{"accept":"application/json, text/javascript, */*; q=0.01",
      "accept-language":"en-US,en;q=0.9,fr;q=0.8",
      "content-type":"application/json; charset=UTF-8",
      "dea-csrftoken":"71ec1aab-37a5-45bc-a4dd-a87319836648",
      "x-requested-with":"XMLHttpRequest"},
      "referrer":"http://ems.drexel.edu/BrowseForSpace.aspx",
      "referrerPolicy":"no-referrer-when-downgrade",
      "body":`{\"roomId\":${roomID},\"start\":\"${startDate}T04:00:00.000Z\",\"end\":\"${endDate}T04:00:00.000Z\"}`,
      "method":"POST","mode":"cors"
    });
  
    let jsons = await response.json();
  
    const bookings = JSON.parse(JSON.parse(jsons.d).JsonData).bookings
    return bookings;
  };
   
  // remenber to put all the functions and global objects inside
  let end = test.DateGen(1);
  let start  = test.DateGen(0);
  let data = await getFieldAvailability(start, end)
  let helperFun = await test.TodayActivities(data)
  
  console.log('====================================');
  console.log(helperFun);
  console.log('====================================');
    db.setState(helperFun)
    .write()

});
module.exports;
