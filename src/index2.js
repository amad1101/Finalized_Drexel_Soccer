const fetch = require('node-fetch');

// Generate date format depending on the amount of date we add.
const dateGen = function formattedDate(amountOfDayToAdd, d = new Date()){
  let dayG = new Date(d.getTime() + ((24 * 60 * 60 * 1000) * amountOfDayToAdd));
  let day = String(dayG.getDate());
  let month = String(dayG.getMonth() + 1);
  const year = String(dayG.getFullYear());

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
const reservations = (async function getFieldAvailability( startDate , endDate, roomID = "2163" ) {
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
  // const json = await response.json();
  // // const json2 = json.d;
  // const { d } = json;
  // // const { Success, SuccessMessage } = d;
  // // const djs = JSON.parse(d);
  // // console.log(json);
  // const { JsonData:succes } =  JSON.parse(d);
  // // console.log(succes);
  //const json = awaitconst json = await
  // // const succes = djs.JsonData;
  // const { bookings } = JSON.parse(succes)




  let jsons = await response.json();
  // let json = response.then(data => {
  //   return data
  // });
  // console.log('====================================');
  // console.log(response.JSON());
  // console.log('====================================');
  // const jsons = await JSON.stringify(response);
  // console.log('====================================');
  // console.log(JSON.parse(JSON.parse(jsons.d).JsonData).bookings);
  // console.log('====================================');
  // const json2 = json;
  // const { d } = await json;
  // // const { Success, SuccessMessage } = d;
  // const djs = await JSON.parse(d);
  //  console.log(djs);
  // const succes =  await djs.JsonData;
  // const succes2 = JSON.parse(succes)
  // const tessst = succes2.bookings
  // // console.log(tessst);
  // // console.log(succes2.bookings);


  // const succes = djs.JsonData;

  const bookings = JSON.parse(JSON.parse(jsons.d).JsonData).bookings
  return bookings;
})(startDate, endDate)
  .then(result => {
    // console.log('====================================');
    // console.log(result);
    // console.log('====================================');
    return result
  })
    .catch(err => {
    console.error(err);
  });
 

  // console.log('====================================');
  // console.log(reservations);
  // console.log('====================================');

// Helper Function that get two days events inputs and classify them depending on the day. output => today:[todayEvents], tomorrow:[tomorrowEvents].
  const one = ( async function todayActivities(data) {
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
  })(reservations)
    .then(result => {
    // console.log('====================================');
    console.log(result);
    // console.log('====================================');
    return result
  })
    .catch(err => {
    console.error(err);
  });
  // // const datas = succes.bookings;


  // console.log(one);
  // const date = new Date();
  // const test = dateGen(25);
   // console.log(test);

  // return await one


// }

// write a for loop that will check if the date is today and return the activities that meet that condition.



// // Generate date format depending on the amount of date we add.
// const dateGen = function formattedDate(amountOfDayToAdd, d = new Date()){
//                   let dayG = new Date(d.getTime() + ((24 * 60 * 60 * 1000) * amountOfDayToAdd));
//                   let day = String(dayG.getDate());
//                   let month = String(dayG.getMonth() + 1);
//                   const year = String(dayG.getFullYear());

//                   if (month.length < 2) month = '0' + month;
//                   if (day.length < 2) day = '0' + day;

//                   return `${year}-${month}-${day}`;
//                 }




// //Current date.
// const startDate = dateGen(0);
// // const endDate = "2019-03-20";
// console.log(startDate);
// //Date of the next day.
// const endDate = dateGen(1);
// console.log(endDate);
// const endDate = "2019-04-01";

// Buckley Field ID
const roomID = "2163";

// MacAlister Room ID for test
// const roomID = "2148"

// const pourTest = getFieldAvailability(roomID, startDate, endDate)
//                 .then ((retur) => retur);
// console.log(getFieldAvailability(roomID, startDate, endDate));
// console.log(pourTest);

// let test = module.exports = { pourTest };

module.exports = {
  method: one
  // end: endDate,
  // start: startDate,
  // id: roomID
}
