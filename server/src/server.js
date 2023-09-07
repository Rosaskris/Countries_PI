const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
})

server.use("/myCountries", router);

module.exports = server;
