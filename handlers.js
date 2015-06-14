var fs = require("fs");

var handlers = (function() {
    "use strict";
    var app = {};

    app["GET /all"] = function(request, response) {
        response.write("GET all");
        response.end();
    };

    app["POST /add"] = function(request, response) {
        var myBubble = "";
        request.on("data", function(chunk) {
            myBubble += chunk;
            console.log("*********" + myBubble);
        });
        request.on("end", function() {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            //response.write("some data testing")
            response.end(myBubble);
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