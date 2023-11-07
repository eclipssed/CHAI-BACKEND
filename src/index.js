// require ('dotenv').config({path: './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(port, () => {
        console.log(`server is running at PORT ${port}`)
    })
  })
  .catch((err) => {
    console.log("err while calling connectDB funciton", err)
    throw err;
  });

// import express from 'express'
// const app = express()

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on('error', (error) => {
//         console.log('app is unable to talk to the mongodb')
//         throw error;
//     })
//     app.listen(process.env.PORT, () => {
//         console.log(`App is listening on port ${process.env.PORT}`)
//     })
//   } catch (error) {
//     console.log("got error while connecting to mongodb", error);
//     throw error;
//   }
// })();
