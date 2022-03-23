$(function() {
    function setPreview(imageID, imageAlt, imageTitle) {
        $("#preview").attr("src", "images/order/" + imageID + ".jpg");
        $("#preview").attr("name", imageID);
        $("#preview").attr("alt", imageAlt);
        $("#preview").attr("title", imageTitle);
    }
    $("#photo-viewer-inner-wrap-right img").click(function() {
        var imageID = $(this).attr("id");
        var imageAlt = $(this).attr("alt");
        var imageTitle = $(this).attr("title");
        setPreview(imageID, imageAlt, imageTitle);
    });
    var imageName = $("#preview").attr("name");
    var imageNum = parseInt(imageName.slice(1, 5));
    var lastChild = $("#photo-viewer-inner-wrap-right:last-child");
    var lastImgName = $(lastChild).attr("name");
    $("#left-arrow").click(function() {
        if (imageNum == 1) {
            var imageID = $(lastChild).attr("id");
            var imageAlt = $(lastChild).attr("alt");
            var imageTitle = $(lastChild).attr("title");
            setPreview(imageID, imageAlt, imageTitle);
        }
    });
    $("#right-arrow").click(function() {
        var lastNum = parseInt(lastImgName.slice(1, 5));
        var firstChild = $("#photo-viewer-inner-wrap-right:first-child");
        if (imageNum == lastNum) {
            var imageID = $(firstChild).attr("id");
            var imageAlt = $(firstChild).attr("alt");
            var imageTitle = $(firstChild).attr("title");
            setPreview(imageID, imageAlt, imageTitle);
        }
    });
    var selectedPhoto = imageName;
    $("#selectimg").click(function() {
        $("#adddialogwrap").show();
        alert(selectedPhoto);
    });

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
    $("#hideshowlist").click(function() {
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
    var colorSelects = document.getElementById("orderform").elements.color;
    alert(colorSelects);
    $("input[name='color']:radio").change(function() {
        alert(colorSelects);
    });
    /*
    $(".addbutton").click(function() {
        $("#emptylist").hide();
        colorVal = $("#color input").val(["Black and white", "Color"]);
        alert(colorVal);
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
    });*/ /* end of add button click function */
});