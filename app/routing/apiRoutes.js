// ===============================================================================
// LOAD THE DATA
// Here we link our routes to a series of "data" sources.
// These data sources hold arrays of info on all possible friends
//================================================================================
var friends= require("../data/friends");


//================================================================================
// ROUTING
//================================================================================
module.exports=function(app) {
    // API GET Requests
    // GET route with the url --/api/friends--. This is used to display a JSON of all possible friends.
    // When users "visit" a page, this is what it will handle.
    // In all cases under this when you as the user visits a link.
    // (ex: localhost:PORT/api/admin... your shown a JSON of the data in the table)
    
        app.get('/api/friends', function(req,res) {
            res.JSON(friends);
        });

    // API POST REQUEST
    // This below handles when you as the user submits a form and thus this submits data to the server.
    // In each of the cases, when a user submits form data (this is a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // POST routes --/api/friends--. This is used to handle incoming survey results. 
    
        app.post('/api/friends', function(req,res) {
            // Here the server responds to the users survey result
            // Then compare resilts of other users in the database
            // It next calculates the difference between each of the numbers and the user"s numbers.
            // Then this choose the user with the least differences as the "best match."
            // In the case of more then one user who hold the same results it chooses the first match.
            // After the test, it pushes you as the user to the database.


            //This object is used to hold the "best match". As you loop through all of the options, this will constantly update
            var topMatch= {
                name: "",
                photo: "",
                friendDifference: Infinity
            };

            //now we take the result of your survey POST and it gets parsed.
            var userData= req.body;
            var userScores= userData.scores;

            //calculating the difference of your "scores" and the scores of everyone or all users in our database with this one variable
            var differenceTotal;

            //Now this is going to loop through all the friends possiblities in the database we have
            for (var i = 0; i < friends.length; i++) {
                var currentTopFriend = friends[i];
                differenceTotal = 0;

                console.log(currentTopFriend.name);
                console.log(currentTopFriend.photo);

                //Now this loops through all the scores of each friend
                for (var j =0; j < currentTopFriend.length; j++) {
                    var currentTopFriendScore = currentTopFriend.scores[j];
                    var currentUserScore = userScores[j];

                    //now this calculates difference between the scores so subtracts them and following then adds them into the totalDifference
                    differenceTotal += Math.abs(parseInt(currentUserScore) - parseInt(currentTopFriendScore));
                }
                    //this if statment is for --if the sum of the differences is less then the difference of the current best matching
                    if (differenceTotal <= topMatch.friendDifference) 
                    {
                        //this will reset the best friend match to the new best or top friend based off your results
                        topMatch.name= currentTopFriend.name;
                        topMatch.photo= currentTopFriend.photo;
                        topMatch.friendDifference = differenceTotal;
                    }
            }
            //Saving here the users or in this case your data to this database (ONLY with your consent by checking the option to save your data, and if not, the database will return ALWAYS that the user is the users best friend )
            friends.push(userData);

            //Returns a JSON with the user's best Match AND used by the HTML in the next page following.
            res.json(topMatch)
        });
};

