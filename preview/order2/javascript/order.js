$(function() {
    function setPreview(imageID, imageAlt, imageTitle) {
        $("#preview").attr("src", "images/order/" + imageID + ".jpg");
        $("#preview").attr("name", imageID);
        $("#preview").attr("alt", imageAlt);
        $("#preview").attr("title", imageTitle);
    }
    function changeImage(direction) {
        if (direction = "next") {
            newNum = imageNum + 1;
        } else {
            newNum = imageNum - 1;
        }
        if (newNum.length() = 1) {
            newNum = "000" + newNum.toString();
        } else if (newNum.length() = 2) {
            newNum = "00" + newNum.toString();
        } else if (newNum.length() = 3) {
            newNum = "0" + newNum.toString();
        } else {
            newNum = newNum.toString();
        }
        return (imageSeries + newNum);
    }
    $("#photo-viewer-inner-wrap-right img").click(function() {
        var imageID = $(this).attr("id");
        var imageAlt = $(this).attr("alt");
        var imageTitle = $(this).attr("title");
        setPreview(imageID, imageAlt, imageTitle);
    });
    var imageName = $("#preview").attr("name");
    console.log(imageName);
    var imageNum = parseInt(imageName.slice(1, 5));
    var imageSeries = imageName.slice(0, 1);
    /* ISSUE */
    var lastChild = $("#photo-viewer-inner-wrap-right:last-child");
    var lastImgName = $(lastChild).attr("name");
    /* ISSUE */
    $("#left-arrow").click(function() {
        if (imageNum == 1) {
            var imageID = $(lastChild).attr("id");
            var imageAlt = $(lastChild).attr("alt");
            var imageTitle = $(lastChild).attr("title");
            setPreview(imageID, imageAlt, imageTitle);
        } else {
            imageID = changeImage("next");
            setPreview(imageID, imageID, imageID);
        }
    });
    $("#right-arrow").click(function() {
        console.log(lastImgName);
        var lastNum = parseInt(lastImgName.slice(1, 5));
        var firstChild = $("#photo-viewer-inner-wrap-right:first-child");
        if (imageNum == lastNum) {
            var imageID = $(firstChild).attr("id");
            var imageAlt = $(firstChild).attr("alt");
            var imageTitle = $(firstChild).attr("title");
            setPreview(imageID, imageAlt, imageTitle);
        } else {
            imageID = changeImage("prev");
            setPreview(imageID, imageID, imageID);
        }
    });
    var pictureID = imageName;
    $("#selectimg").click(function() {
        $("#adddialogwrap").show();
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
        "&nbsp;&nbsp;<input type=\"image\" src=\"images/icons/x_black.png\" alt=\"remove from list\" title=\"Remove from list\" class=\"removebutton\" id=\""
        + pictureList.length + "\"></button></td><td>" + pictureList[i].size + "</td><td>" + pictureList[i].color + 
        "</td><td>" + pictureList[i].signature + "</td><td>" + pictureList[i].quantity + "</td><td>" + currencyFormat.format(pictureList[i].price) + "</td></tr>";
        $("#listtable").append(newRow);
        totalPrice += pictureList[i].price;
        // the following must be included in the function because they only work after the row was added to the DOM
        /*
        $("#listtable tr").mouseover(function() {
            $(this).children().children("input").show();
        }); // end of mouseover function
        $("#listtable tr").mouseout(function() {
            $(this).children().children("input").hide();
        }); // end of mouseout function
        */
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
    $("input[name='color']:radio").change(function() {
        color = this.id;
    });
    $("input[name='signature']:radio").change(function() {
        signature = this.id;
    });
    $("input[name='size']:radio").change(function() {
        size = this.id;
    });
    $("input[name='quantity']").change(function() {
        quantity = $("#picturequant").val();
    });
    submitButton = document.getElementById("submit");
    cancelButton = document.getElementById("cancel");
    submitButton.addEventListener("click", 
    function(event) {
        var valid = true;
        event.preventDefault();
        if (!$("input[name='color']:radio").is(":checked")) {
            $("#valid-1").show();
            valid = false;
            $("input[name='color']:radio").change(function() {
                $("#valid-1").hide();
            });
        } 
        if (!$("input[name='signature']:radio").is(":checked")) {
            $("#valid-2").show();
            valid = false;
            $("input[name='signature']:radio").change(function() {
                $("#valid-2").hide();
            });
        } 
        if (!$("input[name='size']:radio").is(":checked")) {
            $("#valid-3").show();
            valid = false;
            $("input[name='size']:radio").change(function() {
                $("#valid-3").hide();
            });
        }
        if ($("input[name='quantity']").val() == "") {
            $("#valid-4").show();
            valid = false;
            $("input[name='quantity']").change(function() {
                $("#valid-4").hide();
            });
        }
        if (isNaN(parseInt(quantity))) {
            $("#valid-4").show();
            valid = false;
            $("input[name='quantity']").change(function() {
                $("#valid-4").hide();
            });
        }
        if (!valid) {
            valid = true;
            return false;
        }
        $("#emptylist").hide();
        if (color == "colo") {
            color = "Color";
            price = 7.50;
        } else {
            color = "Black and White";
            price = 2.50;
        } // end of color if/else
        if (signature == "jmsignature") {
            signature = "JellyMan's";
            price += 2.50;
        } else if (signature == "evsignature") {
            signature = "Everyone in picture";
            price += 2.50;
        } else {
            signature = "None"
        } // end of signature if/else
        if (size == "4x6") {
            size = "4x6";
        } else {
            size = "8.5x11";
            price *= 2;
        } // end of size if/else
        $("input[name='color']:radio").prop("checked", false);
        $("input[name='signature']:radio").prop("checked", false);
        $("input[name='size']:radio").prop("checked", false);
        $("input[name='quantity']").val("");
        $("#adddialogwrap").hide();

        parseInt(quantity);
        price *= quantity;
        var newImage = new Image(pictureID, size, color, signature, price, quantity);
        pictureList.push(newImage);
        updateList();
        $("#mainlistwrap").fadeIn();
        $("#hideshowlist").html("My List (click to hide)");
    });
    cancelButton.addEventListener("click", 
    function(event) {
        event.preventDefault();
        $("input[name='color']:radio").prop("checked", false);
        $("input[name='signature']:radio").prop("checked", false);
        $("input[name='size']:radio").prop("checked", false);
        $("input[name='quantity']").val("");
        $("#adddialogwrap").hide();
    });
    $("table").on("click", ".removebutton", function() {
        var removeRow = $(this).closest("tr").index() - 1;
        pictureList.splice(removeRow, 1);
        updateList();
    });
});