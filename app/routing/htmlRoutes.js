// ===============================================================================
// DEPENDENCIES
// We need to include this path package to get the correct file path for the html
//================================================================================
var path = require('path');

//================================================================================
// ROUTING
//================================================================================

module.exports=function(app) {
//GET Route to -/survey- which displays the survey page.
// This html GET request handles when the user "visits" a page.
//All this code below, the user is shown an HTML page of content

    app.get('/survey', function(req,res) {
        res.sendFile(path.join(_dirname, "/../public/survey.html"));
    });

// Default, catch-all route which leads to home.html which displays the home page.
//If no matching route is found, this will also default to the home page
    app.get('*', function (req,res) {
        res.sendFile(path.join(_dirname, "/../public/home.html"));
    });

};