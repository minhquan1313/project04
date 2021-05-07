function urlNameToNormalName(e) {
  console.log(decodeURI(e));
  return decodeURI(e);
}

document.getElementById("bgAudio").volume = 0.1;

//Thay doi khi re chuot cac Options
var optionList = document.querySelectorAll("li.optionList__item");
for (var i of optionList) {
  i.addEventListener("mouseover", function () {
    this.classList.add("optionList__item--selected");
  });
  i.addEventListener("mouseout", function () {
    this.classList.remove("optionList__item--selected");
  });
}

//Lay audio
var audioControl = document.getElementById("audioControl");
//Lay icon player cua audio
var bgMusic = document.getElementById("bgAudio");

//Lay ten bai hat
var musicName = [bgMusic.src].toString().split("/").pop();
musicName = musicName.slice(0, musicName.lastIndexOf("."));
// console.log(musicName);
musicName = urlNameToNormalName(musicName);

var musicPaused = document.querySelector('i[class*="ti-control-play"]');
var musicPlaying = document.querySelector('i[class*="ti-control-pause"]');

// <==> on("load",function(){})
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    var nameAudio = audioControl.querySelector(".audioControl__Name");
    nameAudio.innerHTML = musicName;

    var d = setInterval(function () {
      if (!bgMusic.paused) {
        musicPlaying.setAttribute("style", "display: block");
        musicPaused.setAttribute("style", "display: none");
        bgMusic.play();
        clearInterval(d);
      }
    }, 200);

    audioControl.onclick = function () {
      // bgMusic.duration > 0 &&
      if (!isNaN(bgMusic.duration) && bgMusic.duration > 0 && !bgMusic.paused) {
        musicPlaying.setAttribute("style", "display: none");
        musicPaused.setAttribute("style", "display: block");
        bgMusic.pause();
      } else if (!isNaN(bgMusic.duration)) {
        musicPlaying.setAttribute("style", "display: block");
        musicPaused.setAttribute("style", "display: none");
        bgMusic.play();
      }
    };
  }
};

const albumPics = document.querySelectorAll(".leftPanel__albumItem");
// console.log(albumPics);
for (var i of albumPics) {
  i.addEventListener("click", function (e) {
    let imgLink = e.target.src;
    console.log(imgLink);
  });
}
