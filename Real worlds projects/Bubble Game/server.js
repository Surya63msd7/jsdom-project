let timer = 10;
let score = 0;
let hitrn = 0;
function addScore() {
  score += 10;
  document.querySelector("#scorevale").textContent = score;

}


function getNewHit() {
   hitrn = Math.floor(Math.random() * 10);
  document.querySelector("#hitvale").textContent = hitrn;
}


function makeBubble() {
  let flutter = "";

  for (let i = 1; i <= 130; i++) {
    let rn = Math.floor(Math.random() * 10);
    flutter += `<div class="bubble">${rn}</div>`;
  }

  document.querySelector("#ptbtm").innerHTML = flutter;
}


function runTimer() {
  let timerint = setInterval(function () {
    if (timer > 0) {
      timer--;
      document.querySelector("#timerval").textContent = timer;
    } else {
      clearInterval(timerint);
      document.querySelector("#ptbtm").innerHTML = "<h1 font-size= 30px>Game Over</h1>";
    }
  }, 1000);
}

document.querySelector("#ptbtm")
  .addEventListener("click", function (dets) {
    let clickNum = Number(dets.target.textContent);
    // Do something with the clicked number
    if (clickNum === hitrn) {
      addScore();
      makeBubble();
      getNewHit();
    }

  })


runTimer();
makeBubble();
getNewHit();

