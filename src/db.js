const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//Setup the DB
const adapter = new FileSync('db.json')
const db = low(adapter)

let dbexport = module.exports = { db };
