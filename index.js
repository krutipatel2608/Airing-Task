const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const cors = require('cors')

require('dotenv').config()
require('./src/db-config/connection')
require('./src/models/index')

const port = process.env.PORT || 9000

// to support JSON-encoded bodies
app.use(bodyParser.json());

// to support URL-encoded bodies
app.use(
    bodyParser.urlencoded({
        extended : true,
    })
);

app.use(express.json());
app.use(
    express.urlencoded({
      extended: true,
    })
  );

// cors configuration
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(cors());

  fs.readdirSync(path.join(__dirname,'./src/routes')).forEach(function(file){
    if(file === 'index.js' || file.substr(file.lastIndexOf('.') + 1) !== 'js')
    return;

    let name = file.substr(0, file.indexOf('.'));
    require('./src/routes/' + name)(app,router);
  })

  app.listen(port,'localhost', () => {
    console.log(`Server is running on port ${port}.`);
})