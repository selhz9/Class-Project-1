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

  img2.src = ("img/cards/" + compHand[0] + ".png");

	//adds card image to the card slot of the game board
	$('.playerCard').append(img);
	$('.compCard').append(img2);
	$('.playerCard').append(img).animateCss("flipInYRev");
	$('.compCard').append(img2).animateCss("flipInY");

	//calls compare function to compare current cards
	compare(playerCard, compCard);
 function compare(player, comp) {
	if((player % 13) > (comp % 13)) {

		//updates result div of the game board
		$('.result').html("Player wins!");
		$('.result').html("Player wins!").animateCss("flipInX");

		//pushes current cards from each hand to the back of the player's hand
		playerHand.push(comp);
    }
}
  function compare(player, comp) {
		playerHand.shift();
		compHand.shift();

		setTimeout(function() {
			moveCards('player');
		}, 1500);

		//update card counts and check for a winner
		updateCount();
		checkWin();
    }
 function compare(player, comp) {
	else if ((player % 13) < (comp % 13)) {

		//update the results div of the game table
		$('.result').html("Computer wins!");
		$('.result').html("Computer wins!").animateCss("flipInX");

		//pushes current cards from each hand to the back of the computer's hand
		compHand.push(player);
    }
 function compare(player, comp) {
		compHand.shift();
		playerHand.shift();

		setTimeout(function() {
			moveCards('comp');
		}, 1500);

		//update card counts and check for a winner
		updateCount();
		checkWin();
	}

	//if player's current card value is the same as the computer's current card value
	//a "War" (tie) occurs
	//if player's current card value is the same as the computer's current card value a "War" (tie) occurs
	else if ((player % 13) === (comp % 13))
		war();
}

//function to move cards to a winners deck (animation)
function moveCards(winner) {

	if (winner == "player") {
		console.log("moving left");
		$(".playerCard img").css('position', 'relative').animate({ left: '-2000px' }, function() { $(this).hide(); });
		$(".compCard img").css('position', 'relative').animate({ left: '-2000px' }, function() { $(this).hide(); });
	}
	else if (winner == "comp") {
		console.log("moving right");
		$(".playerCard img").css('position', 'relative').animate({ left: '2000px' }, function() { $(this).hide(); });
		$(".compCard img").css('position', 'relative').animate({ left: '2000px' }, function() { $(this).hide(); });
	}
	else if (winner == "playerWar") {
		$("#warArea img").css("position", "relative").animate({ left: '-2000px' }, function() { $("#warArea img").hide(); });
	}
	else if (winner == "compWar") {
		$("#warArea img").css("position", "relative").animate({ left: '2000px' }, function() { $("#warArea img").hide(); });
	}
}


//function to handle "war" instances or "ties"
function war() {

	//show "war" animation
	$('#warAnimation').addClass('war').show();
	$('#warAnimation').css("display", "table");

	$("#warText").animateCss("lightSpeedIn", function() {
		$("#warText").animateCss("lightSpeedOut");
	});

	//keeps animation going for 1 second, then removes the 'war' class and hides the animation
	setTimeout(function() {
		$('#warAnimation').removeClass('war').hide();
		$('#warAnimation').hide();
		$("#warText").removeClass("lightSpeedOut");

		$("#warArea").show();

		//calls function to draw cards from each deck
		warToArray();
	}, 2000);

	//calls function to draw cards from each deck
	warToArray();

}


//function to take cards from each deck and put into "war" array
function warToArray() {

	var cardStr = "";
	var length = 0;

	//if not able to draw 4 cards, draw as many as possible
	if (playerHand.length < 5 || compHand.length < 5) {

		//if computer has less than 4 cards
		if(playerHand.length > compHand.length) {
			//take all but last card and push them to the war array
			for (var i = 0; i < compHand.length-1; i++) {
				warArray.push(playerHand[i]);
				playerHand.shift();
				warArray.push(compHand[i]);
				compHand.shift();
			}

			//compare the new current card from each deck.
			compareWar(playerHand[0], compHand[0]);
			length = compHand.length - 1;
		}

		//if the player hand has less than 4 cards 
		else if(playerHand.length < compHand.length) {

			//take all but 1 and push them to the war array
			for (var i = 0; i < playerHand.length-1; i++) {
				warArray.push(playerHand[i]);
				playerHand.shift();
				warArray.push(compHand[i]);
				compHand.shift();
			}

			//compare the new current card from each deck
			compareWar(playerHand[0], compHand[0]);
		//if the player hand has less than 4 cards
		else if (playerHand.length < compHand.length) {
			length = playerHand.length - 1;
		}
	}
}

	//if both decks have greater than four cards
	else {
		length = 3;		
	}

		//take three cards from each deck and push them to the war array
		for (var i = 0; i < 4; i++) {
			warArray.push(playerHand[i]);
			playerHand.shift();
			warArray.push(compHand[i]);
			compHand.shift();
		}

		//compare the new current card from each deck
		compareWar(playerHand[0], compHand[0]);
	//take the cards from each deck and push them to the war array
	for (var i = 0; i < length; i++) {
		warArray.push(playerHand[0]);
		playerHand.shift();
		warArray.push(compHand[0]);
		compHand.shift();
		cardStr += '<img src="img/cardback.jpg">';
	}

	//set up the War visual with relevant cards
	$(".playerWarFinal").html("<img src='img/cards/"+playerHand[0]+".png'>").animateCss("flipInYRev");
	$(".playerWarCards").html(cardStr);
	$(".compWarCards").html(cardStr);
	$(".compWarFinal").html("<img src='img/cards/"+compHand[0]+".png'>").animateCss("flipInY");

	//compare the new current card from each deck
	compareWar(playerHand[0], compHand[0]);
}


function compareWar(player, comp) {
		//resets the war array to empty
		warArray.length = 0;

		setTimeout(function() {
			moveCards("playerWar");
			moveCards("player");
		}, 3000);

		setTimeout(function() {
			$("#warArea").hide();
		}, 3500);

		//update card count and check for a winner
		updateCount();
		checkWin();
    }
function compareWar(player, comp) {
	else if ((player % 13) < (comp % 13)) {

		//update result section of the game board
		$('#result').html("Computer wins!");
		$('.result').html("Computer wins!");

		//pushes the entire war array to the back of the computer's hand
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
	//if computer is out of cards, player wins
	else if (compHand.length == 0) {

		alert("Player wins!! :D");
		$(".result").html("You won the game! :)").animateCss("flipInX");

		//resets the card and deck image to make it seem like the computer is out of cards.
		$('.compHand').html("");
		$('.compCard').html("");
		$('.compDeck').html("");

    }
}//hides the "deal" button, forces the player to only start a new game
 function checkWin() {
//function that hides the "how to play" screen and shows the game board
function play() {
	hideAll();
	$('#desktop').show();
	$("#header").show().addClass("animated fadeInDown");
	$("#gameboard").show();
	playing = true;
}
 }

//function to update the card count after every "deal" finishes
function updateCount() {
	$('.playCount').html("Player cards: " + playerHand.length);
	$('.compCount').html("Computer cards: " + compHand.length);
}


//simple function to hide big page elements, usually followed by showing other specific elements
function hideAll() {
	$("#jumbotron").hide();
	$("#desktop").hide();
	$("#gameboard").hide();
	$("#howToPlay").hide();
	$("#header").hide();
	$(".newGame").hide();
}

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

//function to preload images into the browser cache for quicker loading during play
function preloadImages() {
	for (var i = 0; i < 52; i++) {
		var img = new Image();
		img.src = 'img/cards/'+i+'.png';
	}
}