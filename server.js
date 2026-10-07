let flutter = "";

for (let i = 1; i <= 80; i++) {
  let rn = Math.floor(Math.random() * 10)
  flutter += `<div class="bubble">${rn}</div>`;
}

document.querySelector("#ptbtm").innerHTML = flutter;
