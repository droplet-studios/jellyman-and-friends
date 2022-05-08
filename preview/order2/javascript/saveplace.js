/* timeline page only */

/* save place in timeline */
$(function() {
    var index = parseInt(localStorage.getItem("index"));
    var clicked = localStorage.getItem("clicked");
    if (clicked) {
    $("#savedplacebox").html("You were on #" + index);
    $("#savedplacebox").fadeIn();
    setTimeout(function() {
        $("#savedplacebox").fadeOut();
    }, 3000);
    $(".timeline li").eq(index).css("font-weight", "bold");
    $("#lastread").html("You were on #" + index);
    if(index != 1) {
        $(".timeline li").eq(index - 1).attr("id", "last");
    } else {
        $("#lastreadlink").attr("href", "#");
    } /* end of if/else to set id of story relative to last read */
    } else {
    $("#clear").hide();
    } /* end of function if story has been clicked before */
    $(".timeline li").click(function() {
        localStorage.removeItem("index");
        var index = $(this).index();
        var clicked = true;
        localStorage.setItem("index", index);
        localStorage.setItem("clicked", clicked);
        $("#savedplacebox").html("Your place was saved at #" + index);
        $("#savedplacebox").fadeIn();
        setTimeout(function() {
            $("#savedplacebox").fadeOut();
        }, 3000); // end if saved place box fade setTimeout   
        $(".timeline li").css("font-weight", "normal");
        $(".timeline li").eq(index).css("font-weight", "bold");
        $("#lastread").html("You were on #" + index);
        $(".timeline li").attr("id", ""); /* clear all id when another story is clicked */
        if(index != 1) {
            $(".timeline li").eq(index - 1).attr("id", "last");
            $("#lastreadlink").attr("href", "#last");
        } else {
            $("#lastreadlink").attr("href", "#");
        } /* end of if/else to set id of story relative to last read and the link */
        $("#clear").show();
    }) /* end of timeline list item click function */
        $("#clear").click(function() {
            localStorage.clear();
            $("#clear").html("Your spot will be cleared when you reload the page, unless you select another spot before then.");
        });  // end of clear storage click func.  
}); // end of document ready function