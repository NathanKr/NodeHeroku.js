console.log("app is loading");
const fs = require("fs");
const express = require("express");
const fileName = "server.log";
const process = require("process");

const port = process.env.PORT || 3000;

// --- create an app
const app = express();

/* 
        next() mark that this middleware has finished

        it is important to be used before the request handlers
*/
app.use((req, res, next) => {
  const now = new Date().toString();
  const info = `time : ${now} ,method : ${req.method} , url : ${req.url}`;
  console.log(info);
  try {
    fs.appendFileSync(fileName, `${info}\n`);
  } catch (err) {
    console.log(`Error appendFileSync : ${err.message}`);
  }

  console.log(info);

  next();
});

// --- handle request to /
app.get("/", (req, res) => {
  res.send({ hello: "express" });
});

// --- handle request to /about
app.get("/about", (req, res) => {
  res.send("<h1>This is about</h1>");
});

// --- mount middleware to serve static files e.g. html\image inside public directory
app.use(express.static(__dirname + "/public"));

console.log(`port is : ${port}`);
// --- listen for requests on this port
app.listen(port);
