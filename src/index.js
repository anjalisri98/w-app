const express = require('express');
const bodyParser = require('body-parser');
const route = require('../src/routes/route');

// application method
const app = express();

// setting up  ejs engine
app.set('view engine','ejs')

// global middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});