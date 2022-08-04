const express = require("express");
const cors = require("cors");
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')

dotenv.config()
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Some constants
const PORT=process.env.PORT || 5214;
const DB_URL=process.env.MONGO_DB_URL;


const user_route = require("./routes/userRoute");
const owner_route = require("./routes/ownerRoute");
const transaction_route = require("./routes/transactionRoute");


mongoose.connect(DB_URL).then(connected=>{
  console.log(`Connected to Database`)
}).catch(error=>{
  console.log(`Could not connect to Databse`)
})

app.use('/api', user_route)
app.use('/api', owner_route)
app.use('/api', transaction_route)

app.listen(PORT, () => {
  console.log("Server has started at port " + PORT);
});
