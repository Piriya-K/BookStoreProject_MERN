import express, { request, response } from "express"; // import express.js into the file
import { PORT, mongoDBURL } from "./config.js"; // import port from config.js
import mongoose from "mongoose"; // import mongoose library into the project
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

// create a constant for the app
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http//localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// the get() is a http method that gets a requested resource from the server. A callback function is added to handle the get() method.
// routing the "/" page
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to the Bookstore Project");
});

app.use("/books/", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    //connect to mongoose
    console.log(`App connect  ed to dtabase`);
    // fucntion to listen to port. Pass PORT as an argument and add a callback function that console logs the PORT value
    app.listen(PORT, () => {
      console.log(`App is listenting to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
