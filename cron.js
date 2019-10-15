const cron = require('node-cron');

// const test = require("./src/index")
const { db } = require("./src/db")

// update the db each hours
cron.schedule(' 0 * * * *', async () => {
  
  const { DateTime } = require("luxon");
  date2 = DateTime.local().setZone('America/New_York').plus({ days: 1 }).toISODate();
  date = DateTime.local().setZone('America/New_York').toISODate();

  console.log('====================================');
  console.log(` today ${date}`);
  console.log('====================================');

  console.log('====================================');
  console.log(` tomorow ${date2}`);
  console.log('====================================');
  // console.log(typeof(date));
  // console.log(date2);
  const fetch = require('node-fetch');
  //Fetch fuction
  async function getFieldAvailability( startDate , endDate, roomID = "2163" ) {
    const response = await fetch("https://ems.drexel.edu/EMSwebapp/ServerApi.aspx/GetLocationDetailsAvailability", 
    {"credentials":"include",
    "headers":{"accept":"application/json, text/javascript, */*; q=0.01",
    "accept-language":"en-US,en;q=0.9,fr;q=0.8",
    "content-type":"application/json; charset=UTF-8",
    "dea-csrftoken":"db0881df-692a-4c4b-a14b-e1fe5fba7d91",
    "sec-fetch-mode":"cors","sec-fetch-site":"same-origin",
    "x-requested-with":"XMLHttpRequest"},
    "referrer":"https://ems.drexel.edu/EMSwebapp/BrowseForSpace.aspx",
    "referrerPolicy":"no-referrer-when-downgrade",
    "body":`{\"roomId\":${roomID},\"start\":\"${startDate}T04:00:00.000Z\",\"end\":\"${endDate}T04:00:00.000Z\"}`,
    "method":"POST","mode":"cors"});
  
    let jsons = await response.json();
  
    const bookings = JSON.parse(JSON.parse(jsons.d).JsonData).bookings
    return bookings;
  };

  
// Helper Function that get two days events inputs and classify them depending on the day. output => today:[todayEvents], tomorrow:[tomorrowEvents].
async function todayActivities(data) {
  // return data
  reservation = await data;
  let datas = {};
  // console.log(data.length);
  if(reservation.length  > 0){
    for (var i = 0; i < reservation.length; i++) {
      let startActivity = reservation[i].Start.toString();
      // console.log(startActivity);
      // return startActivity;
      if (startActivity.includes(date)) {
          if (!datas.today) {
            datas.today = [reservation[i]]
          }
          else {
            datas.today.push(reservation[i])
          }
      // console.log(data[i]);
      }
      else if(startActivity.includes(date2)) {
        if (!datas.tomorow) {
          datas.tomorow = [reservation[i]]
        }
        else {
          datas.tomorow.push(reservation[i])
        }
      }
      // console.log(datas);
      else {
        continue
      }
    //
    }
    return datas
  }
  else{
    return ""
  }
};
   
  // remenber to put all the functions and global objects inside
  // let end = test.DateGen(1);
  // let start  = test.DateGen(0);
  let data = await getFieldAvailability(date, date2)
  let helperFun = await todayActivities(data)
  
  console.log('====================================');
  console.log(helperFun);
  console.log('====================================');
    db.setState(helperFun)
    .write()

});
module.exports;
