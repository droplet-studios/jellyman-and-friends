function comingSoon() {
  alert("I will launch my music page very soon. You will be able to listen to my asom disco beets and tunes, as well as see me dance. Please check back later!");
}
function comingSoonDroplet() {
  alert("Coming soon: Chocolate Crinkle Cookie's world famous computer company, Droplet Computer, Inc. will have a website soon! Stay tuned for details!");
}
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
  if ((currentHour <= 0 && currentHour < 3) || (currentHour >= 18 && currentHour <= 23)) {
    $("#time-greet").html("Good evening!");
  } else if (currentHour >= 3 && currentHour < 12) {
    $("#time-greet").html("Good morning!");
  } else if (currentHour >= 12 && currentHour < 18) {
    $("#time-greet").html("Good afternoon!");
  } /* end of if-else statement to show and hide the nav bar */


  /* following code borrowed from https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings */
  var currencyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  /* end borrowed code */
  function updateList() {
    $(".removeable").remove();
    var totalPrice = 0;
    for (var i = 0; i < pictureList.length; i++) {
      var newRow = "<tr class=\"removeable\"><td>" + pictureList[i].pictureID + 
      "&nbsp;&nbsp;<input type=\"image\" src=\"images/icons/x_black.png\" alt=\"remove from list\" title=\"Remove from list\" class=\"removebutton\"></button></td><td>" + 
      pictureList[i].size + "</td><td>" + pictureList[i].color + 
      "</td><td>" + pictureList[i].signature + "</td><td>" + pictureList[i].quantity + "</td><td>" + currencyFormat.format(pictureList[i].price) + "</td></tr>";
      $("#listtable").append(newRow);
      totalPrice += pictureList[i].price;
      // the following must be included in the function because they only work after the row was added to the DOM
      $("#listtable tr").mouseover(function() {
        $(this).children().children("input").show();
      }); // end of mouseover function
      $("#listtable tr").mouseout(function() {
        $(this).children().children("input").hide();
      }); // end of mouseout function
    } // end of picture list loop
    $("#listtable").append("<tr class=\"removeable\"></td><td colspan=\"6\"><strong>Total: " + currencyFormat.format(totalPrice) + "</strong></td></tr>");
    $("#listwrap").show();
  } // end of updatList function

  pictureList = [];
  $("#hideshowlist").click(function(){
    if ($("#mainlistwrap").css("display") == "none") {
      $("#mainlistwrap").fadeIn();
      $("#hideshowlist").html("My List (click to hide)");
      if (pictureList.length == 0 || pictureList == null) {
        $("#emptylist").show();
        $("#listwrap").hide();
      } else {
        $("#emptylist").hide();
        $("#listwrap").show();
      }
    } else {
      $("#mainlistwrap").fadeOut();
      $("#hideshowlist").html("My List (click to show)");
    }
  }); // end of click function for hiding and showing list
  class Image {
    constructor(pictureID, size, color, signature, price, quantity) {
      this.pictureID = pictureID;
      this.size = size;
      this.color = color;
      this.signature = signature;
      this.price = price;
      this.quantity = quantity;
    } // end Image constructor
  } // end Image class
  var pictureList = [];
  var size, color, signature, price, quantity;
  $(".addbutton").click(function() {
    $("#emptylist").hide();
    do {
      color = prompt("Do you want a color picture?\nEnter 'A' for yes\nEnter 'B' for no");
    } while (color != "A" && color != "a" && color != "B" && color != "b"); // end of do while color
    if (color == "A" || color == "a") {
      color = "Color";
      price = 7.50;
    } else {
      color = "Black and White";
      price = 2.50;
    } // end of color if/else
    do {
      signature = prompt("Do you want a signature?\nEnter 'A' for yes\nEnter 'B' for no");
    } while (signature != "A" && signature != "a" && signature != "B" && signature != "b"); // end of do while signature
    if (signature == "A" || signature == "a") {
      signature = "Yes";
      price += 2.50;
    } else {
      signature = "No";
    } // end of signature if/else
    do {
      size = prompt("What size of picture?\nEnter 'A' for 4x6\nEnter 'B' for 8.5x11");
    } while (size != "A" && size != "a" && size != "B" && size != "b"); // end of do while size
    if (size == "A" || size == "a") {
      size = "4x6";
    } else {
      size = "8.5x11";
      price *= 2;
    } // end of size if/else
    do {
      quantity = prompt("How many would you like?");
    } while (isNaN(parseInt(quantity))); // end of do while quantity
    parseInt(quantity);
    price *= quantity;
    var pictureID = $(this).parent().parent().attr("id");  
    var newImage = new Image(pictureID, size, color, signature, price, quantity);
    pictureList.push(newImage);
    updateList();

    $(this).attr("src", "images/icons/check.png");
    setTimeout(function() {
        $(".addbutton").attr("src", "images/icons/add.png");
    }, 3000); // end of addbutton setTimeout
  }); /* end of add button click function */

	
}); /* end of ready function */