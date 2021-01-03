var modeButtons = document.querySelectorAll(".mode");
var numBlocks = 8;
var maxBlocks = 18;
var blocks = document.querySelectorAll(".block");
init();

function init() {
	setUpMode();
	reset();
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
	for(var i = 0; i < maxBlocks; i++) {
		if (i < numBlocks) {
			blocks[i].style.display = "block";
		}
		else {
			blocks[i].style.display = "none";
		}
	}
}