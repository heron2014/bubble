var fs = require("fs");

var handlers = (function() {
    "use strict";
    var app = {};

    app["POST /add"] = function(request, response) {
        var myBubble = "";
        var bubbles = require(__dirname + "/data.json"); //loads the array with all bubbles - tweets

        request.on("data", function(chunk) {
            myBubble += chunk; //this is string because it turns bubble input box buffer into text
            console.log("*********" + myBubble);
        });

        request.on("end", function() {
            var entry = {body: myBubble, timestamp: new Date().toUTCString()};
            bubbles.push(entry);
            console.log(entry);
            fs.writeFile("data.json", JSON.stringify(bubbles), function(err) { //rewrites the file with new bubbles
               if (err) throw err;
                console.log("The data to append was append to the file data.json")
            });
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(JSON.stringify(entry)); //sends back new bubble for display
        });
    };

    app["GET /all"] = function(request, response) {
        var bubblesLoad = require(__dirname + "/data.json");
        console.log(bubblesLoad);
        response.end(JSON.stringify(bubblesLoad));

        //fs.readFile("data.json", function(err, data) {
        //    if (err) throw err;
        //    console.log("data to be send to all " + data);
        //    response.end(data);
        //});
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