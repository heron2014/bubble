var fs = require("fs");

var handlers = (function() {
    "use strict";
    var app = {};

    app["GET /all"] = function(request, response) {
        response.write("GET all");
        response.end();
    };

    app["POST /add"] = function(request, response) {
        var myFakeData = "";
        request.on("data", function(data) {
            myFakeData += data;
            console.log("*********" + myFakeData);
        });
        request.on("end", function() {
            response.write("Show this in html - test");
            response.end();
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