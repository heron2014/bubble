(function() {
    "use strict";
    console.log("testing");

    function addBubble(data) {
        return "<div class='bubble'>" + "<p>" + data.body + "</p>" + "</div>";
    }

    window.onload = function() {
        $.get("/all", function(data) {
            var bubbles = JSON.parse(data);
            //var bubbles = obj.bubbles;
            console.log(bubbles);
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
