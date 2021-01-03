var modeButtons = document.querySelectorAll(".mode");
var numBlocks = 8;
var maxBlocks = 18;
var blocks = document.querySelectorAll(".block");
var colors = [];
var assignments = [];
var selected_block = -1;

init();

function init() {
	initializeColors();
	setUpBlocks();
	setUpMode();
	reset();
}

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

function setUpBlocks() {
	for(var i = 0; i < blocks.length; i++) {
		blocks[i].addEventListener("click",function() {
			for(var i = 0; i < blocks.length; i++) {
				if (this == blocks[i]) {
					this.style.backgroundColor = assignments[i];
					if (selected_block == i) {}
					else if (selected_block == -1) {
						selected_block = i;
					}
					else if (assignments[selected_block] == assignments[i]) {
						selected_block = -1;
					}
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

function setUpMode() {
	for(var i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click",function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent=="Easy") {
			numBlocks = 8;
			for (var j = 0; j < numBlocks; j++) {
				blocks[j].classList.remove("hard");
				blocks[j].classList.add("easy");
			}
		}
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

function assignColors() {
	var availableBlocks = [];
	for (var i = 0; i < numBlocks; i++) {
		availableBlocks.push(i);
	}

	// Puts color in two available blocks
	for (var i = 0; i < Math.floor(numBlocks/2); i++) {
		var temp = Math.floor(Math.random()*availableBlocks.length);
		var randIndex = availableBlocks[temp];
		//blocks[randIndex].style.backgroundColor = colors[i];
		assignments[randIndex] = colors[i];
		availableBlocks.splice(temp,1);

		temp = Math.floor(Math.random()*availableBlocks.length);
		randIndex = availableBlocks[temp];
		//blocks[randIndex].style.backgroundColor = colors[i];
		assignments[randIndex] = colors[i];
		availableBlocks.splice(temp,1);
	}
}