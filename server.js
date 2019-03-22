// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express= require('express');
const path= require('path');

var app = express()

//Initial port being set to use later in our listener
var PORT= process.env.PORT || 8080;

// Sets up the Express app to handle data parsing, or express.json and express.urlEncoded make it easy for our server to interpret data sent to it. The code below is pretty standard.
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

// ================================================================================
// ROUTER
// Pointing our server to a series of "route" files which give this server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================



//--Listener to effectivily start this server
app.listen(PORT, function () {
    console.log('App listening on PORT: '+ PORT);
});

app.listen(8080)