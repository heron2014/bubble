var fs = require("fs");

var handlers = (function() {
    "use strict";
    var app = {};

    app["GET /all"] = function(request, response) {
        //var bubblesLoad = require(__dirname + "/data.json");
        //var bubbles = fs.readFileSync(__dirname + "/data.json");
        //console.log(bubblesLoad);
        response.write("GET all");
        //response.end(JSON.stringify(bubbles));
        //response.end(JSON.stringify(bubblesLoad));
        response.end();
    };

    app["POST /add"] = function(request, response) {
        //var bubblesData = [];
        var myBubble = "";
        //var newBubble;
        var bubbles = require(__dirname + "/data.json"); //loads the array with all bubbles - tweets

        request.on("data", function(chunk) {
            myBubble += chunk + ""; //this is string because it turns bubble input box buffer into text
            console.log("*********" + myBubble);
        });

        request.on("end", function() {
            var entry = {body: myBubble, timestamp: Date.now()};
            bubbles.push(entry);
            //var entry = JSON.stringify(({body: myBubble})) + "\n";
            console.log(entry);
            //bubblesData.push(entry);
            //bubbles.push(entry); //adds new bubble to bubbles array
            fs.writeFile("data.json", JSON.stringify(bubbles), function(err) { //rewrites the file with new bubbles
               if (err) throw err;
                console.log("The data to append was append to the file data.json")
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            //response.write("some data testing")
            //console.log(bubblesData.toString());
            response.end(JSON.stringify(entry)); //sends back new bubble for display
        });
    };
    app.generic = function(request, response) {
        fs.readFile(__dirname + request.url, function(err, data) {
           if(err) {
               fs.readFile(__dirname + "/404.html", function (err, data) {
                  response.write(data);
                   response.end();
               });
           } else {
               var ext = request.url.split(".")[1];
               response.writeHead(200, {"Content-Type": "text/" + ext});
               response.write(data);
               response.end();
           }

        });
    };

    return app;

})();

module.exports = handlers;