document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    if (!document.getElementById("popup")) createPopup();
    const popup = document.getElementById("popup");

    embedHomeUrl();
    setVolume(0.05);
    removeLoader();
    musicNBackGControl();
    initializingImgs(1);
    rollOnClick();
    // margin-top: calc(12px - 224px * 1);
    popupFunc();
    setDraggableFalse();
  }
};
// **************************************************************************************************************************************************
function createPopup() {
  let popup = document.createElement("div");
  popup.setAttribute("class", "popup");
  popup.setAttribute("id", "popup");
  popup.setAttribute("style", "display: none");
  document.querySelector("body").prepend(popup);
}
function isMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  } else false;
}
function embedHomeUrl() {
  let redirectParentWebpage = document.getElementById("logo");
  redirectParentWebpage.onclick = () => {
    if (window.location.protocol.includes("http")) {
      let tempUrl = window.location.href;

      let tempUrlLength = tempUrl.indexOf("/", 7);
      let tempUrlPLength = tempUrl.toLowerCase().indexOf("/project", tempUrlLength);

      // if (tempUrlPLength >= 0) {
      //   tempUrlPLength++;
      //   console.log(tempUrl.slice(0, tempUrl.indexOf("/", tempUrlPLength)));
      // } else {
      //   console.log(tempUrl.slice(0, tempUrlLength));
      // }

      if (tempUrlPLength >= 0) {
        tempUrlPLength++;
        window.location.replace(tempUrl.slice(0, tempUrl.indexOf("/", tempUrlPLength)));
      } else {
        window.location.replace(tempUrl.slice(0, tempUrlLength));
      }
    } else alert("Failed to redirect to home page because this is not http(s)");

    // window.location.replace();
  };
}
function setVolume(e) {
  document.getElementById("bgAudio").volume = e;
}
function removeLoader() {
  let loader = document.getElementById("popUpLoader");
  if (loader) {
    let squid = document.querySelector(".loader__animal");
    let lines = document.querySelector(".bombLines");
    let body = document.querySelector("body");
    let loadText = document.querySelector(".loader__Progr");
    let wrapper = document.querySelector(".wrapper");
    let vi = document.getElementById("bgVideo");
    vi.pause();

    wrapper.style.transform = "translateY(100vh)";
    body.setAttribute("style", "overflow: hidden; height: 100vh");
    //Scale the squid to 0 and pop out the round lines ----------------------------------------------------------------------------------------------
    setTimeout(() => {
      lines.style.animation = "bombLines 5s -0.6s linear forwards";
      squid.setAttribute("style", "transition: all ease 0.3s; transform: scale(0);");
      loadText.style.transition = "all 0.6s ease-in";
      loadText.style.transformOrigin = "top";
      loadText.style.transform = "scale(0) rotate(360deg)";
      loadText.style.top = "50%";
      // Make the popup background to visible through and pull up the loader background -------------------------------------------------------------
      setTimeout(() => {
        popup.setAttribute("style", "backdrop-filter: none; background-color: transparent; pointer-events: none");
        loader.setAttribute("style", "transition: all ease-out 0.6s; transform: translateY(-100vh)");
        wrapper.style.transition = "all 0.6s ease-out";
        wrapper.style.transform = "translateY(0vh)";
        //Complete remove the popup background ------------------------------------------------------------------------------------------------------
        setTimeout(() => {
          popup.innerHTML = "";
          popup.setAttribute("style", "display: none");
          body.removeAttribute("style");
          wrapper.removeAttribute("style");
          vi.play();
        }, 700);
      }, 800);
    }, 1000);
  } else {
    // let popup = document.getElementById("popup");
    popup.innerHTML = "";
    popup.style.display = "none";
  }
}
function musicNBackGControl() {
  // Audio
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
function initializingImgs(e) {
  // ******************************************************************************************************************************************************
  let imgs = [];
  imgs.push(new ConsInfo("Hinh 0", "", "item0.jpg"));
  imgs.push(new ConsInfo("Hinh 1", "", "item1.jpg"));
  imgs.push(new ConsInfo("Hinh 2", "", "item2.jpg"));
  imgs.push(new ConsInfo("Hinh 3", "", "item3.jpg"));
  imgs.push(new ConsInfo("Hinh 4", "", "item4.jpg"));
  imgs.push(new ConsInfo("Hinh 5", "", "item5.jpg"));
  // ******************************************************************************************************************************************************

  function ConsInfo(na, de, ur) {
    this.name = na;
    if (!de) de = "Chua cap nhat thong tin";
    this.desc = de;
    this.src = "../resources/img/albumRightHand/" + ur;
    this.error = "../resources/img/albumRightHand/error.svg";
  }
  if (e == 1) {
    let album = document.getElementById("imgAlbumRightHand");
    let check = true;
    if (imgs.length < 1) {
      imgs[0] = new ConsInfo("Unknown", "", "error.svg");
      check = false;
    }
    for (let i of imgs) {
      let li = document.createElement("li");
      li.classList.add("rightPanel__albumItem");
      let img = document.createElement("img");
      img.src = i.src;
      img.title = i.name;
      img.alt = i.desc;
      img.classList.add("rightPanel__albumItemP");
      if (!check) img.style.objectFit = "contain";

      img.onerror = function () {
        img.src = i.error;
        img.style.objectFit = "contain";
      };
      li.appendChild(img);
      album.appendChild(li);
    }
  }
}
function rollOnClick() {
  // ********************************************************************************************
  let imgLi = document.querySelectorAll(".rightPanel__albumItem");
  if (imgLi.length > 0) {
    let numberOfPictures = 2;
    let btns = document.querySelectorAll(".rightPanel__btn");
    let imgToDisplay = imgLi.length - numberOfPictures + 1;
    let imgHeight = imgLi[0].clientHeight;
    let imgUl = document.querySelector(".rightPanel__album");
    let imgMargin = parseInt(window.getComputedStyle(imgLi[0]).marginTop);
    let num = 1;

    onClick();
    onDrag();

    function imgRoll(num) {
      for (let i of imgLi) {
        i.style.transition = "all 0.3s ease";
      }
      imgLi[0].style.marginTop = `calc(${imgMargin}px - (${imgHeight}px + ${imgMargin * 2}px) * ${num - 1})`;
    }
    function onClick() {
      for (let i of btns) {
        i.addEventListener("click", (e) => {
          if (e.target.closest("button").className.includes("up")) {
            num -= 1;
            if (num < 1) num = 1;
            imgRoll(num);
          } else {
            num += 1;
            if (num > imgToDisplay) num = imgToDisplay;
            if (num < 1) num = 1;
            imgRoll(num);
          }
        });
      }
    }
    function onDrag() {
      let pressed = false,
        startY,
        currentY;
      if (!isMobile()) {
        imgUl.addEventListener("mousedown", (e) => {
          if (!e.target.closest("button")) {
            pressed = true;
            currentY = parseInt(window.getComputedStyle(imgLi[0]).marginTop);
            startY = e.y;
            for (let i of imgLi) i.style.transition = "";
          }
        });
        window.addEventListener("mousemove", (e) => {
          if (pressed) {
            imgLi[0].style.marginTop = `calc(${currentY}px + ${e.y - startY}px)`;
          }
        });
        window.addEventListener("mouseup", (e) => {
          if (pressed) {
            currentY = currentY + e.y - startY;
            pressed = false;
            if (currentY > 12) num = 1;
            else
              for (let i = 1; i <= imgToDisplay; i++) {
                let margin = imgMargin - (imgHeight + imgMargin * 2) * i;
                if (i == imgToDisplay || currentY - margin > 100) {
                  num = i;
                  break;
                }
              }
            imgRoll(num);
          }
        });
      } else {
        imgUl.addEventListener("touchstart", (e) => {
          if (!e.target.closest("button")) {
            pressed = true;
            currentY = parseInt(window.getComputedStyle(imgLi[0]).marginTop);
            startY = e.touches[0].clientY;
            for (let i of imgLi) i.style.transition = "";
          }
        });
        window.addEventListener("touchmove", (e) => {
          if (pressed) {
            imgLi[0].style.marginTop = `calc(${currentY}px + ${e.touches[0].clientY - startY}px)`;
          }
        });
        window.addEventListener("touchend", (e) => {
          if (pressed) {
            currentY = currentY + e.changedTouches[0].clientY - startY;
            pressed = false;
            if (currentY > 12) num = 1;
            else
              for (let i = 1; i <= imgToDisplay; i++) {
                let margin = imgMargin - (imgHeight + imgMargin * 2) * i;
                if (i == imgToDisplay || currentY - margin > 100) {
                  num = i;
                  break;
                }
              }
            imgRoll(num);
          }
        });
      }
    }
  }
}
function popupFunc() {
  const delay = 200;
  const bgVideo = document.getElementById("bgVideo");
  // Initialize some function for PopUp -------------------------------------------------------------------------------------------------------------
  function getPopup() {
    popup.setAttribute("style", `display: flex; transition: all ${delay / 1000}s ease; opacity: 0;`);
    setTimeout(function () {
      popup.style.opacity = 1;
    }, 0);
  }
  function shutPopup() {
    popup.setAttribute("style", `transition: all ${delay / 1000}s ease; pointer-events: none; opacity: 0;`);
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
  popup.onclick = function (e) {
    if (e.target.className == popup.className) {
      playBackgroundVideo(bgVideo);
      shutPopup();
    }
  };
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
          <div class="msgBox__inner" style="--xShape-delay: ${animateDur / 2 + 0.4}s">
            <div class="roundShape roundShape--msg">
              <div
                class="xShape"
                style="--rotate: 0deg; --xShape-delay: ${animateDur / 2 + 0.6}s"
              ></div>
            </div>
          </div>

          <div class="msgBox__inner" style="--xShape-delay: ${animateDur / 2 + 0.5}s">
            <div class="roundShape roundShape--msg">
              <div
                class="xShape"
                style="--rotate: 0deg; --xShape-delay: ${animateDur / 2 + 0.7}s"
              ></div>
            </div>
          </div>

          <div class="msgBox__inner" style="--xShape-delay: ${animateDur / 2 + 0.6}s">
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

  function popupImg(e) {
    getPopup();
    let popupImg = document.createElement("div");
    popupImg.classList.add("popupImg");
    popupImg.setAttribute("style", "top:0px;left:0px");
    let img = document.createElement("img");
    img.classList.add("popupImg__P");
    img.src = e.target.src;
    img.title = e.target.alt;
    img.draggable = false;
    let name = document.createElement("p");
    name.classList.add("popupImg__name");
    name.innerText = e.target.title;
    popupImg.appendChild(img);
    popupImg.appendChild(name);

    pauseBackgroundVideo(bgVideo);
    imgControl(popupImg);
    popup.appendChild(popupImg);
    // ----------------------------------------------------------------------------------------------------------------------------------------------
    function imgControl(imgDiv) {
      let img = imgDiv.children[0];
      let zoom = 1;
      popup.addEventListener("wheel", (e) => {
        let delta = e.deltaY * -0.001;
        if (zoom + delta > 0.001) zoom += delta;
        imgDiv.style.transition = "all 0.1s ease";
        imgDiv.style.transform = `scale(${zoom.toFixed(2)})`;
      });

      let pressed = false,
        x,
        y,
        currentX = 0,
        currentY = 0;

      // EventListener ************************************************************************************************************************************
      img.addEventListener("mousedown", (e) => {
        pressed = true;
        x = e.x;
        y = e.y;
        imgDiv.style.transition = "";
      });
      window.addEventListener("mousemove", (e) => {
        if (pressed) {
          popupImg.style.left = `${e.x - x + currentX}px`;
          popupImg.style.top = `${e.y - y + currentY}px`;
        }
      });
      window.addEventListener("mouseup", () => {
        pressed = false;
        currentY = parseInt(imgDiv.style.top);
        currentX = parseInt(imgDiv.style.left);
      });
      // EventListener MOBILE*******************************************************************************************************************************
      img.addEventListener("touchstart", (e) => {
        pressed = true;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        imgDiv.style.transition = "";
      });
      window.addEventListener("touchmove", (e) => {
        if (pressed) {
          popupImg.style.left = `${e.touches[0].clientX - x + currentX}px`;
          popupImg.style.top = `${e.touches[0].clientY - y + currentY}px`;
          // imgDiv.children[1].innerHTML = `${e.touches[0].clientX}px`;
        }
      });
      window.addEventListener("touchend", () => {
        pressed = false;
        currentY = parseInt(imgDiv.style.top);
        currentX = parseInt(imgDiv.style.left);
      });
      // EventListener MOBILE*******************************************************************************************************************************
    }
  }
  // ------------------------------------------------------------------------------------------------------------------------------------------------
  const notDeved = document.querySelectorAll(".--notDeveloped");
  for (var i of notDeved) {
    i.addEventListener("click", function (e) {
      if (popup && popup.style.display == "none") popupError(this);
    });
  }

  const imgsAlbum = document.querySelectorAll(".rightPanel__albumItemP");
  for (var i of imgsAlbum) {
    let click = false,
      startX = 0,
      startY = 0;
    i.addEventListener("mousedown", (e) => {
      click = true;
      startY = e.clientY;
      startX = e.clientX;
    });
    i.addEventListener("mousemove", (e) => {
      if (Math.abs(e.clientY - startY) > 10 || Math.abs(e.clientX - startX) > 10) click = false;
    });
    i.addEventListener("mouseup", (e) => {
      if (popup && popup.style.display == "none") if (click) popupImg(e);
      click = false;
    });
  }
}
function setDraggableFalse() {
  let imgs = document.querySelectorAll("img");
  for (let i of imgs) {
    i.setAttribute("draggable", "false");
  }
}
function goFullScreen() {
  function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  }

  toggleFullScreen();
}
