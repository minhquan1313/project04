function removeLoader() {
  let loader = document.getElementById("popUpLoader");
  let squid = document.getElementsByClassName("loader__animal");
  let lines = document.getElementsByClassName("bombLines");

  lines[0].style.animation = "bombLines 5s ease-out forwards";
  squid[0].setAttribute(
    "style",
    "transition: all ease 0.3s; transform: scale(0);"
  );
  setTimeout(() => {
    let popup = document.getElementById("popup");
    popup.setAttribute(
      "style",
      "backdrop-filter: none; background-color: transparent; pointer-events: none"
    );
    loader.setAttribute(
      "style",
      "transition: all ease-in 1s; transform: translateY(-100%)"
    );
    setTimeout(() => {
      popup.innerHTML = "";
      setTimeout(() => {
        popup.removeAttribute("style");
        popup.style.display = "none";
      }, 300);
    }, 1000);
  }, 800);
}
// Getting url for embedding to the website logo --------------------
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

document.getElementById("bgAudio").volume = 0.02;

// Track mouse when hover over options on screen --------------------
var optionList = document.querySelectorAll("li.optionList__item");
for (var i of optionList) {
  i.addEventListener("mouseover", function () {
    this.classList.add("optionList__item--selected");
  });
  i.addEventListener("mouseout", function () {
    this.classList.remove("optionList__item--selected");
  });
}

// Get audio Controller (play/pause) --------------------------------
var audioControl = document.getElementById("audioControl");
// Get background audio element
var bgMusic = document.getElementById("bgAudio");

// Decode URL text to normal text that people can read --------------
function urlNameToNormalName(e) {
  return decodeURI(e);
}
// Get audio's filename
var musicName = [bgMusic.src].toString().split("/").pop();
musicName = musicName.slice(0, musicName.lastIndexOf("."));
musicName = urlNameToNormalName(musicName);

// Get the play and pause elements in DOM ---------------------------
var musicPaused = document.querySelector('i[class*="ti-control-play"]');
var musicPlaying = document.querySelector('i[class*="ti-control-pause"]');

// <==> on("load",function(){})
// Wait until DOM is fully loaded then start checking status of
// background music and to change play/pause button when clicked
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    removeLoader();
    // Audio
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

// Left hand pictures -----------------------------------------------
// const albumPics = document.querySelectorAll(".leftPanel__albumItem");
// for (var i of albumPics) {
//   i.addEventListener("click", function (e) {
//     let imgLink = e.target.src;
//   });
// }

//PopUp initializing ------------------------------------------------
if (document.getElementById("popup")) {
  const popup = document.getElementById("popup");
} else {
  let temp = document.createElement("div");
  let body = document.querySelector("body");
  temp.classList.add("popup");
  temp.setAttribute("id", "popup");
  temp.style.display = "none";
  body.prepend(temp);
  const popup = document.getElementById("popup");
}
const delay = 200;
const bgVideo = document.getElementById("bgVideo");
// console.log(bgVideo.readyState);

// Initialize some function for PopUp -------------------------------
function getPopup() {
  popup.setAttribute(
    "style",
    `display: flex; transition: all ${delay / 1000}s ease; opacity: 0;`
  );
  setTimeout(function () {
    popup.style.opacity = 1;
  }, 0);
}

function shutPopup() {
  popup.setAttribute(
    "style",
    `transition: all ${delay / 1000}s ease; pointer-events: none; opacity: 0;`
  );
  setTimeout(function () {
    popup.setAttribute("style", "display: none;");
    popup.innerHTML = "";
  }, delay);
}

function playBackgroundVideo(e) {
  if (!e.play()) {
    e.play();
  }
}

function pauseBackgroundVideo(e) {
  if (!e.pause()) {
    e.pause();
  }
}
// When click the popup background ----------------------------------
popup.onclick = function (e) {
  if (e.target.className == popup.className) {
    playBackgroundVideo(bgVideo);
    shutPopup();
  }
};
//Error -------------------------------------------------------------
// console.log(popup.tagName);
function popupError(e) {
  getPopup();
  let animateDur = 0.4;
  const popupError = document.createElement("div");
  popupError.classList.add("popupError");

  // Get text in the clicked element --------------------------------
  let text = e.innerText;
  if (text == "") {
    text = e.tagName;
    if (text != "BUTTON" && text != "IMG") {
      let check = e.querySelectorAll("*");
      if (check) {
        let checkFor = false;
        for (var i of check) {
          if (i.tagName == "BUTTON" || i.tagName == "IMG") {
            text = i.tagName;
            if (text != "IMG") {
              text = text.toLowerCase();
              text = text.replace(text.charAt(0), text.charAt(0).toUpperCase());
            } else text = "Image";
            checkFor = true;
            break;
          }
        }
        if (!checkFor) text = "Unknown";
      } else text = "Unknown";
    } else {
      text = text.toLowerCase();
      text = text.replace(text.charAt(0), text.charAt(0).toUpperCase());
    }
  }

  popupError.style.animation = `popupError ${animateDur}s ease`;
  // Set content for the popupError variable ------------------------
  popupError.innerHTML = `<div class="popupError__P">
    <div class="popupError__P-phone">
      <div class="whiteScreen">
        <div class="topBunnyEar"></div>

        <div class="roundShape">
          <div
            class="xShape"
            style="--rotate: 45deg; --xShape-delay: ${animateDur / 2 + 0.2}s"
          ></div>

          <div
            class="xShape"
            style="--rotate: -45deg; --xShape-delay: ${animateDur / 2 + 0}s"
          ></div>
        </div>

        <div class="msgBox">
          <div class="msgBox__inner" style="--xShape-delay: ${
            animateDur / 2 + 0.4
          }s">
            <div class="roundShape roundShape--msg">
              <div
                class="xShape"
                style="--rotate: 0deg; --xShape-delay: ${animateDur / 2 + 0.6}s"
              ></div>
            </div>
          </div>

          <div class="msgBox__inner" style="--xShape-delay: ${
            animateDur / 2 + 0.5
          }s">
            <div class="roundShape roundShape--msg">
              <div
                class="xShape"
                style="--rotate: 0deg; --xShape-delay: ${animateDur / 2 + 0.7}s"
              ></div>
            </div>
          </div>

          <div class="msgBox__inner" style="--xShape-delay: ${
            animateDur / 2 + 0.6
          }s">
            <div class="roundShape roundShape--msg">
              <div
                class="xShape"
                style="--rotate: 0deg; --xShape-delay: ${animateDur / 2 + 0.8}s"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="popupError__P-lineWFlower">
      <div class="line">
        <div class="flower1">
          <div class="flower1__canh"></div>
          <div class="flower1__hoa"></div>
        </div>

        <div class="flower2">
          <div class="flower2__canh"></div>

          <div class="flower2__hoa-sub flower2__hoa-subP1"></div>
          <div class="flower2__hoa"></div>
          <div class="flower2__hoa-sub flower2__hoa-subP2"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="popupError__404">
    <div class="popupError__404-inner">
      <div class="popupError__4">
        <div class="line-u" style="--timeL-u: ${animateDur / 2 + 0}s"></div>
        <div class="line-u" style="--timeL-u: ${animateDur / 2 + 0.3}s"></div>
        <div class="line-4"></div>
      </div>
      <div class="popupError__0">
        <div class="line-u0 line-u0--1"></div>
        <div class="line-u0 line-u0--2"></div>
        <div class="line-u0 line-u0--3"></div>
      </div>
      <div class="popupError__4">
        <div class="line-u" style="--timeL-u: ${animateDur / 2 + 0.1}s"></div>
        <div class="line-u" style="--timeL-u: ${animateDur / 2 + 0.4}s"></div>
        <div class="line-4"></div>
      </div>
    </div>
  </div>

  <p class="popupError__desc">
    Sorry the ${text} is not yet developed 😭
  </p>`;

  // Pause the background video and then write the popupError
  // variable to DOM
  pauseBackgroundVideo(bgVideo);
  popup.appendChild(popupError);
}

//get --notDeveloped classes in DOM ---------------------------------
const notDeved = document.querySelectorAll(".--notDeveloped");
for (var i of notDeved) {
  i.addEventListener("click", function (e) {
    if (popup && popup.style.display == "none") popupError(this);
  });
}
