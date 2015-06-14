var router = require("./router");
var http = require("http").createServer(router);

http.listen(process.env.PORT || 8000); // first argument for heroku
