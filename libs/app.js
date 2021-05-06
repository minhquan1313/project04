document.getElementById("bgAudio").volume = 0.1;
var optionList = document.querySelectorAll("li.optionList__item");

for (var i of optionList) {
  i.addEventListener("mouseover", function () {
    this.classList.add("optionList__item--selected");
  });
  i.addEventListener("mouseout", function () {
    this.classList.remove("optionList__item--selected");
  });
}

var audioControl = document.getElementById("audioControl");
var bgMusic = document.getElementById("bgAudio");

if (bgMusic.duration > 0 && !bgMusic.paused) {
  audioControl.innerHTML = `<i class="ti-control-pause"></i>`;
} else {
  bgMusic.play();
  audioControl.innerHTML = `<i class="ti-control-pause"></i>`;
}

audioControl.onclick = function () {
  if (audioControl.firstElementChild.className.includes("pause")) {
    audioControl.innerHTML = `<i class="ti-control-play"></i>`;
    bgMusic.pause();
  } else {
    audioControl.innerHTML = `<i class="ti-control-pause"></i>`;
    bgMusic.play();
  }
};
// audioControl.onclick = alert("abc");
