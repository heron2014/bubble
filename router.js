var handlers = require("./handlers");
var fs = require("fs"); // file system shipped from node

function router(request, response) {
    "use strict";
    console.log(request.url);
    if (request.url === "/") {
        fs.readFile(__dirname + "/index.html", "utf-8", function(err, data) {
           if (err) {
               response.write("Can not read index.html");
               response.end();
           } else {
               response.write(data);
               response.end();
           }
        });
    } else {
        var urlPath = request.method + " " + request.url;
        var endUrlPath = handlers[urlPath];
        if (endUrlPath) {
            endUrlPath(request, response);
        } else {
            handlers.generic(request, response);
        }
    }
}

module.exports = router;