const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
//import mongodbb from ('mongodb');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const UserRoute = require("./routes/User");
dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('CONNECTED TO MONGO DB'))
  .catch(e => console.log(e));

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//ROUTES
app.use("/v1/auth", UserRoute);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on PORT " + process.env.PORT);
});
