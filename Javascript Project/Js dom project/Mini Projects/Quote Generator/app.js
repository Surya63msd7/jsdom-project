let quotes = [
  "The future depends on what you do today. — Mahatma Gandhi",
  "It always seems impossible until it’s done. — Nelson Mandela",
  "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
  "Believe you can and you’re halfway there. — Theodore Roosevelt",
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Do what you can, with what you have, where you are. — Theodore Roosevelt",
  "Dream big and dare to fail. — Norman Vaughan",
  "A journey of a thousand miles begins with a single step. — Lao Tzu",
  "Act as if what you do makes a difference. It does. — William James",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
];

let button = document.querySelector("button");
let quoteDisplay = document.querySelector("h1");

button.addEventListener("click", function () {
  let randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = quotes[randomIndex];
});