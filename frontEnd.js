(function() {
    "use strict";
    //console.log("testing");

    function addBubble(data) {
        console.log("This is addBubble" + data);
        return "<div class='bubble'>" + "<p>" + data.body + " " + data.timestamp + "</p>" + "</div>";
    }

    var sortBubbles = function(bubbles) { //sorts bubbles by timestamp
        return bubbles.sort(function (a, b) {
            if (a.time < b.time) {
                return 1;
            }
            if (a.time > b.time) {
                return -1;
            }
            return 0;
        });
    };

    window.onload = function() {
        $.get("/all", function(data) {
            //console.log("testing onload");
            //console.log("this is data from window onload"  + data)
            var bubbles = sortBubbles(JSON.parse(data));
            //console.log("this is window onload" + bubbles);
            var accessDOM = "";
            for (var i = 0; i < bubbles.length; i++) {
                //console.log(bubbles[i]);
                //console.log(bubbles);
                accessDOM += addBubble(bubbles[i]);
                console.log("This is coming from get"  +accessDOM);
            }
            $("#bubbles").prepend(accessDOM);
        });
    };

    $("#bubbleForm").submit(function(event) {
        event.preventDefault();

        var myNewBubble = $("#newBubbleInput").val();
        console.log(myNewBubble);
        if (myNewBubble.length) {
            //console.log(myNewBubble);
            $.post("/add", myNewBubble, function(data) {
                console.log("My data"  +data);
                var newBubbleJson = JSON.parse(data);
                console.log("**********" + newBubbleJson);
                $("#bubbles").prepend(addBubble(newBubbleJson));
                console.log(addBubble(newBubbleJson));
            });
            $("#newBubbleInput").val("");
        }
    });
})();
