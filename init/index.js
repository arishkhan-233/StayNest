const mongoose = require('mongoose');
const initData = require("./data.js")
const Listing = require("../models/listing.js");
main()
.then(()=>{
    console.log("connected to db")
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}
const initDB = async ()=>{
    await Listing.deleteMany({})
    initData.data=initData.data.map((obj)=>({...obj,owner:"68a98578387f8d4c4390184a"}))
    await Listing.insertMany(initData.data)
    console.log("data initialised")
}
initDB()