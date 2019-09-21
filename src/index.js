// const fetch = require('node-fetch');

// Generate date format depending on the amount of date we add.
const dateGen = function formattedDate(amountOfDayToAdd, d = new Date()){
  let dayG = new Date(d.getTime() + ((24 * 60 * 60 * 1000) * amountOfDayToAdd));
  let day = String(dayG.getDate());
  let month = String(dayG.getMonth() + 1);
  const year = String(dayG.getFullYear());
  console.log('====================================');
  console.log(dayG);
  console.log('====================================');

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return `${year}-${month}-${day}`;
}

//Current date.
const startDate = dateGen(0);
// const endDate = "2019-03-20";
console.log(startDate);
//Date of the next day.
const endDate = dateGen(1);
console.log(endDate);


// Send request to the drexel facility reservation system and get back a json data for Buckley Field.
// async function getFieldAvailability( startDate , endDate, roomID = "2163" ) {
//   const response = await fetch("http://ems.drexel.edu/ServerApi.aspx/GetLocationDetailsAvailability",
//     {"credentials":"include",
//     "headers":{"accept":"application/json, text/javascript, */*; q=0.01",
//     "accept-language":"en-US,en;q=0.9,fr;q=0.8",
//     "content-type":"application/json; charset=UTF-8",
//     "dea-csrftoken":"71ec1aab-37a5-45bc-a4dd-a87319836648",
//     "x-requested-with":"XMLHttpRequest"},
//     "referrer":"http://ems.drexel.edu/BrowseForSpace.aspx",
//     "referrerPolicy":"no-referrer-when-downgrade",
//     "body":`{\"roomId\":${roomID},\"start\":\"${startDate}T04:00:00.000Z\",\"end\":\"${endDate}T04:00:00.000Z\"}`,
//     "method":"POST","mode":"cors"
//   });

//   let jsons = await response.json();

//   const bookings = JSON.parse(JSON.parse(jsons.d).JsonData).bookings
//   return bookings;
// };
 
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
        if (startActivity.includes(startDate)) {
            if (!datas.today) {
              datas.today = [reservation[i]]
            }
            else {
              datas.today.push(reservation[i])
            }
        // console.log(data[i]);
        }
        else if(startActivity.includes(endDate)) {
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
  
// Buckley Field ID
const roomID = "2163";

// MacAlister Room ID for test
// const roomID = "2148"

module.exports = {
  // method: getFieldAvailability,
  DateGen: dateGen,
  TodayActivities: todayActivities
}
