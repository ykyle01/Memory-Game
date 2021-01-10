var modeButtons = document.querySelectorAll(".mode");
var numBlocks = 8;
var maxBlocks = 18;
var blocks = document.querySelectorAll(".block");
var colors = [];
var assignments = [];

// Selected_block == -1 when a block hasn't been selected yet
var selected_block = -1;

init();

// Initializes the colors and on-click functions
function init() {
	initializeColors();
	setUpBlocks();
	setUpMode();
	reset();
}

// Randomizes colors and adds to list
function initializeColors() {
	for(var i = 0; i < Math.floor(maxBlocks/2); i++){
		do {
			var r = Math.floor(Math.random()*256);
			var g = Math.floor(Math.random()*256);
			var b = Math.floor(Math.random()*256);
			var res = "rgb("+r+", "+g+", "+b+")";
		} while(colors.includes(res));
		colors.push(res);
	}
}

// Sets up on click function for each block
function setUpBlocks() {
	for(var i = 0; i < blocks.length; i++) {
		blocks[i].addEventListener("click",function() {
			for(var i = 0; i < blocks.length; i++) {
				if (this == blocks[i]) {
					// Show the hidden color
					this.style.backgroundColor = assignments[i];

					if (selected_block == i) {}
					else if (selected_block == -1) {
						selected_block = i;
					}
					// If correct pair, keep showing both blocks
					else if (assignments[selected_block] == assignments[i]) {
						selected_block = -1;
					}
					// If incorrect pair, wait, then hide them again
					else {
						setTimeout(function(selected_block, i){
							blocks[selected_block].style.backgroundColor = "skyblue";
							blocks[i].style.backgroundColor = "skyblue";
						}, 1000, selected_block, i);
						selected_block = -1;
					}
				}
			}
		});
	}
}

// Sets up mode buttons on click functions
function setUpMode() {
	for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click",function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		// Easy has 8 blocks and restyles HTML
		if (this.textContent=="Easy") {
			numBlocks = 8;
			for (var j = 0; j < numBlocks; j++) {
				blocks[j].classList.remove("hard");
				blocks[j].classList.add("easy");
			}
		}
		// Hard has 18 blocks and restyle HTML
		else {
			numBlocks = 18;
			for (var j = 0; j < numBlocks; j++) {
				blocks[j].classList.remove("easy");
				blocks[j].classList.add("hard");
			}
		}
		reset();
		});
	}
}

// Assigns new random colors and shows the right number of blocks
function reset() {
	assignColors();
	for(var i = 0; i < maxBlocks; i++) {
		if (i < numBlocks) {
			blocks[i].style.display = "block";
			blocks[i].style.backgroundColor = "skyblue";
		}
		else {
			blocks[i].style.display = "none";
		}
	}
}

// Assigns pairs of colors
function assignColors() {
	// Creates list of available blocks
	var availableBlocks = [];
	for (var i = 0; i < numBlocks; i++) {
		availableBlocks.push(i);
	}

	// Puts color in two available blocks
	for (var i = 0; i < Math.floor(numBlocks/2); i++) {
		var temp = Math.floor(Math.random()*availableBlocks.length);
		var randIndex = availableBlocks[temp];
		assignments[randIndex] = colors[i];
		availableBlocks.splice(temp,1);

		temp = Math.floor(Math.random()*availableBlocks.length);
		randIndex = availableBlocks[temp];
		assignments[randIndex] = colors[i];
		availableBlocks.splice(temp,1);
	}
}