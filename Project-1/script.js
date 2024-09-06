const avatarUrls = [
    "path/to/avatar1.png",
    "path/to/avatar2.jpg",
    "path/to/avatar3.svg",
    // ... more avatar URLs
  ];
  
  // Get a reference to the image element
  const avatarImage = document.getElementById("avatar-image");                                                                                             function chooseAvatar() {
    // Get the selected avatar image element
    const selectedAvatar = document.querySelector('input[name="avatar"]:checked');
  
    if (selectedAvatar) {
      // Store the image URL in local storage
      localStorage.setItem('avatar', selectedAvatar.value);
  
      // Update the displayed avatar image
      const avatarPreview = document.getElementById('avatar-preview');
      avatarPreview.src = selectedAvatar.value;
    }
  }
  
  // Function to display the stored avatar on page load
  function displayAvatar() {
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      const avatarPreview = document.getElementById('avatar-preview');
      avatarPreview.src = storedAvatar;
    }
  }
  
  // Call the displayAvatar function on page load
displayAvatar();

// Display player and computer cards
var img = document.createElement('img');
img.src = "img/cards/" + playerHand[0] + ".png";

var img2 = document.createElement('img');
img2.src = "img/cards/" + compHand[0] + ".png";

$('.playerCard').append(img).animateCss("flipInYRev");
$('.compCard').append(img2).animateCss("flipInY");

// Call the compare function to compare current cards
compare(playerHand[0], compHand[0]);

// Function to compare player and computer cards
function compare(player, comp) {
    if ((player % 13) > (comp % 13)) {
        $('.result').html("Player wins!").animateCss("flipInX");
        playerHand.push(comp);
    } else if ((player % 13) < (comp % 13)) {
        $('.result').html("Computer wins!").animateCss("flipInX");
        compHand.push(player);
    } else {
        war();
    }
}

// Function to handle "war" instances or ties
function war() {
    $('#warAnimation').addClass('war').show();
    $('#warAnimation').css("display", "table");
    $("#warText").animateCss("lightSpeedIn", function() {
        $("#warText").animateCss("lightSpeedOut");
    });

    setTimeout(function() {
        $('#warAnimation').removeClass('war').hide();
        $("#warText").removeClass("lightSpeedOut");
        $("#warArea").show();
        warToArray();
    }, 2000);
}

// Function to move cards to a winner's deck with animation
function moveCards(winner) {
    if (winner == "player") {
        $(".playerCard img").animate({ left: '-2000px' }, function() { $(this).hide(); });
        $(".compCard img").animate({ left: '-2000px' }, function() { $(this).hide(); });
    } else if (winner == "comp") {
        $(".playerCard img").animate({ left: '2000px' }, function() { $(this).hide(); });
        $(".compCard img").animate({ left: '2000px' }, function() { $(this).hide(); });
    } else if (winner == "playerWar") {
        $("#warArea img").animate({ left: '-2000px' }, function() { $("#warArea img").hide(); });
    } else if (winner == "compWar") {
        $("#warArea img").animate({ left: '2000px' }, function() { $("#warArea img").hide(); });
    }
}

// Function to handle war scenario and move cards to warArray
function warToArray() {
    var length = Math.min(playerHand.length, compHand.length, 4);

    for (var i = 0; i < length; i++) {
        warArray.push(playerHand.shift());
        warArray.push(compHand.shift());
    }

    // Additional logic for displaying cards and comparing
}



function compareWar(player, comp) {
    // Reset the war array to empty
    warArray.length = 0;

    setTimeout(function() {
        moveCards("playerWar");
        moveCards("player");
    }, 3000);

    setTimeout(function() {
        $("#warArea").hide();
        // Update card count and check for a winner
        updateCount();
        checkWin();
    }, 3500);
}
function compareWar(player, comp) {
    if ((player % 13) < (comp % 13)) {
        // Update result section of the game board
        $('#result').html("Computer wins!");
        $('.result').html("Computer wins!");

        // Push the entire war array to the back of the computer's hand
        compHand.push.apply(compHand, warArray);
    }
}
function compareWar(player, comp) {
		//resets the war array to empty
		warArray.length = 0;

		setTimeout(function() {
			moveCards("compWar");
			moveCards("comp");
		}, 3000);

		setTimeout(function() {
			$("#warArea").hide();
		}, 3500);

		//update card count and check for a winner
		updateCount();
		checkWin();
    }
function checkWin() {

	//if player is out of cards, computer wins
	if (playerHand.length == 0) {
		alert("Computer wins. :(");
		$(".result").html("The computer wins the game :(").animateCss("flipInX");

		//resets the card and deck image to make it seem like the player is out of cards
		$('.playerCard').html("");
    }
}
function checkWin() {
    if (compHand.length == 0) {
        alert("Player wins!! :D");
        $(".result").html("You won the game! :)").animateCss("flipInX");

        // Reset the computer's hand, card, and deck images
        $('.compHand').html("");
        $('.compCard').html("");
        $('.compDeck').html("");
    }
}
// Function to check win condition and update game state
function checkWin() {
    if (compHand.length == 0) {
        alert("Player wins!! :D");
        $(".result").html("You won the game! :)").animateCss("flipInX");

        // Reset the computer's hand, card, and deck images
        $('.compHand').html("");
        $('.compCard').html("");
        $('.compDeck').html("");

        // Hide the "deal" button to force the player to start a new game
        $('#dealButton').hide();
    }
}

// Function to transition from "how to play" screen to game board
function play() {
    hideAll();
    $('#desktop').show();
    $("#header").show().addClass("animated fadeInDown");
    $("#gameboard").show();
    playing = true;
}

//function to update the card count after every "deal" finishes
function updateCount() {
	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + compHand.length);
}


//simple function to hide big page elements, usually followed by showing other specific elements
// function hideAll() {
// 	$("#jumbotron").hide();
// 	$("#desktop").hide();
// 	$("#gameboard").hide();
// 	$("#howToPlay").hide();
// 	$("#header").hide();
// 	$(".newGame").hide();
// }

window.onload = function() {

	preloadImages();

	hideAll();
	$("#jumbotron").show();
	$("#howToPlay").show();
	fillArray();

	$("#year").html(new Date().getFullYear());
};

//custom function, used with animate.css to quickly add and then remove animation classes (once animation is finished)
//found here: https://github.com/daneden/animate.css
$.fn.extend({
	animateCss: function(animationName, callback) {
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
              callback();
            }
        });
        return this;
	}
});

// //function to preload images into the browser cache for quicker loading during play
// function preloadImages() {
// 	for (var i = 0; i < 52; i++) {
// 		var img = new Image();
// 		img.src = 'img/cards/'+i+'.png';
// 	}
// }
