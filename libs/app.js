function urlNameToNormalName(e) {
  return decodeURI(e);
}

var redirectParentWebpage = document.getElementById("logo");

redirectParentWebpage.onclick = function () {
  if (window.location.protocol.includes("http")) {
    let tempUrl = window.location.href;

    let tempUrlLength = tempUrl.indexOf("/", 7);
    let tempUrlPLength = tempUrl
      .toLowerCase()
      .indexOf("/project", tempUrlLength);

    // if (tempUrlPLength >= 0) {
    //   tempUrlPLength++;
    //   console.log(tempUrl.slice(0, tempUrl.indexOf("/", tempUrlPLength)));
    // } else {
    //   console.log(tempUrl.slice(0, tempUrlLength));
    // }

    if (tempUrlPLength >= 0) {
      tempUrlPLength++;
      window.location.replace(
        tempUrl.slice(0, tempUrl.indexOf("/", tempUrlPLength))
      );
    } else {
      window.location.replace(tempUrl.slice(0, tempUrlLength));
    }
  } else
    console.log("Failed to redirect to home page because this is not http(s)");

  // window.location.replace();
};

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

    audioControl.onclick = function (e) {
      if (e.target.closest("i[class*='ti-']"))
        if (
          !isNaN(bgMusic.duration) &&
          bgMusic.duration > 0 &&
          !bgMusic.paused
        ) {
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
for (var i of albumPics) {
  i.addEventListener("click", function (e) {
    let imgLink = e.target.src;
  });
}
