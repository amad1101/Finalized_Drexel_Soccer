const cron = require('node-cron');

const test = require("./src/index")
const { db } = require("./src/db")

// update the db each hours
cron.schedule(' 0 * * * *', async () => {
  
  let end = test.DateGen(1);
  let start  = test.DateGen(0);
  let data = await test.method(start, end)
  let helperFun = await test.TodayActivities(data)
  
  console.log('====================================');
  console.log(helperFun);
  console.log('====================================');
    db.setState(helperFun)
    .write()

});
module.exports;