const express = require("express");
const path = require("path");
const http = require("http");
// help to solv problem if other domin want to get api
const cors = require("cors");
// diffine route for app
const {routesInit} = require("./routes/configRoutes");
require("./db/mongoConnect");

const app = express();

// use the cors to for alow other domien to get api
app.use(cors());

app.use(express.json());
// diffine public file for user
app.use(express.static(path.join(__dirname,"public")));


routesInit(app);
// diffine the server 
const server = http.createServer(app);
// diffine the port
let port = process.env.PORT || 3005;
server.listen(port);
