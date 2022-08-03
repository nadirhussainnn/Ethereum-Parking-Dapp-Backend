const express = require("express");
const app = express();
const cors = require("cors");
const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config()

//Some constants
const PORT=process.env.PORT || 8082;
const DB_URL=process.env.MONGO_DB_URL;


const user_route = require("./routes/userRoute");
const owner_route = require("./routes/ownerRoute");
const transaction_route = require("./routes/transactionRoute");


mongoose.connect(DB_URL).then(connected=>{
  console.log(`Connected to Database`)
}).catch(error=>{
  console.log(`Could not connect to Databse`)
})


//allow app to use cors and response to be in json format
app.use(cors());
app.use(express.json());


app.use('/api', user_route)
app.use('/api', owner_route)
app.use('/api', transaction_route)

app.listen(PORT, () => {
  console.log("Server has started at port " + PORT);
});
