const mongoose = require("mongoose")
const debug = require("debug")("gsc-backend:config:database")

mongoose.set("debug", true)

main().catch((error)=> debug(error))
async function main() {
  await mongoose.connect(process.env.DATABASE_URL)
}

const db = mongoose.connection;

db.on("connected", function () {
  debug(`Connected to ${db.name} at ${db.host}:${db.port}`)
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})