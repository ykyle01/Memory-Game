var modeButtons = document.querySelectorAll(".mode");
init();

function init(){
	setUpModeButtons();
}

function setUpModeButtons(){
	for(var i = 0;i<modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
	});
}
}
