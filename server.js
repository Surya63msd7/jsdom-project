let timer = 60;

function getNewHit() {
  let rn = Math.floor(Math.random() * 10);
  document.querySelector("#hitvale").textContent = rn;
}


function makeBubble() {
  let flutter = "";

  for (let i = 1; i <= 80; i++) {
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
    }
  }, 1000);
}
runTimer();
makeBubble();
getNewHit();
