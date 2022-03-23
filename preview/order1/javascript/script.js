/*
function comingSoon() {
  alert("I will launch my music page very soon. You will be able to listen to my asom disco beets and tunes, as well as see me dance. Please check back later!");
}

function comingSoonDroplet() {
  alert("Coming soon: Chocolate Crinkle Cookie's world famous computer company, Droplet Computer, Inc. will have a website soon! Stay tuned for details!");
}
*/

$(function() {

  /* on all pages */
  
  /* nav bar and button */
  $("#navbutton").click(function() {
    if ($("nav").css("display") == "none") {
      $("nav").fadeIn();
      $("#navbutton").attr("src", "images/icons/x.png");
      $("#navbutton").attr("alt", "hide navigation links");
    } else {
      $("nav").fadeOut();
      $("#navbutton").attr("src", "images/icons/hamburgerbutton.png");
      $("#navbutton").attr("alt", "show navigation links");
    } /* end of if-else */
  }); /* end of click function */

  /* changes copyright year automatically */
  var currentYear = new Date().getFullYear();
  $("#copyright").html("&copy; " + currentYear + " JellyMan Asom");


  /* homepage only */

  /* change greeting on homepage header */
  var currentHour = new Date().getHours();
  var currentMonth = new Date().getMonth();
  var currentDay = new Date().getDay();
  if ((currentHour <= 0 && currentHour < 3) || (currentHour >= 18 && currentHour <= 23)) {
    $("#time-greet").html("Good evening!");
  } else if (currentHour >= 3 && currentHour < 12) {
    $("#time-greet").html("Good morning!");
  } else if (currentHour >= 12 && currentHour < 18) {
    $("#time-greet").html("Good afternoon!");
  } /* end of if-else statement to change homepage greeting, part 1 */
  if (currentMonth == 0 && currentDay == 1) {
    $("#time-greet").html("Happy New Year!");
  } else if (currentMonth >= 10 && currentMonth <= 11) {
    $("#time-greet").html("Happy Holidays!")
  }



  /* businesses */
  $("#droplet").click(function() {
    alert("Coming soon: Chocolate Crinkle Cookie's world famous computer company, Droplet Computer, Inc. will have a website soon! Stay tuned for details!");
  });

  $("#music").click(function() {
    alert("I will launch my music page very soon. You will be able to listen to my asom disco beets and tunes, as well as see me dance. Please check back later!");
  });

  /* group the photos in the gallery */
/*
  var galleryFig = $("#gallerypics > figure");
  for (var i = 0; i < galleryFig.length; i += 3) {
    galleryFig.slice(i, i + 3).wrapAll("<div class=\"gal-col\"></div>");
  }
  for (var i = 0; i < galleryFig.length; i += 3) {
    galleryFig.slice(i, i + 3).unwrap();
  }
  for (var i = 0; i < galleryFig.length; i += 2) {
    galleryFig.slice(i, i + 2).wrapAll("<div class=\"gal-col\"></div>");
  }
  */
}); /* end of ready function */