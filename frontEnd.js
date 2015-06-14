(function() {
    "use strict";
    console.log("testing");

    function addBubble(data) {
        console.log("This is addBubble" + data);
        return "<div class='bubble'>" + "<p>" + data.body + "</p>" + "</div>";
    }

    window.onload = function() {
        $.get("/all", function(data) {
            console.log("testing onload");
            console.log("this is data from window onload"  + data)
            var bubbles = JSON.parse(data);
            //var bubbles = obj.bubbles;
            console.log("this is window onload" + bubbles);
            var accessDOM = "";
            for (var i = 0; i < bubbles.length; i++) {
                accessDOM += addBubble(bubbles[i]);
            }
            $("#bubbles").prepend(accessDOM);
        });
    };

    $("#bubbleForm").submit(function(event) {
        //alert( "Handler for .submit() called." );
        event.preventDefault();

        var myNewBubble = $("#newBubbleInput").val();
        if (myNewBubble.length) {
            console.log(myNewBubble);
            $.post("/add", myNewBubble, function(data) {
                //
                console.log(data);
                var newBubbleJson = JSON.parse(data);
                //var newBubble = JSON.parse(data);
                    $("#bubbles").prepend(addBubble(newBubbleJson));
                    $("#newBubbleInput").val("");
            });
        }

    });



})();
