let randomBtn = document.querySelector('.randomBtn')
let colorInput = document.querySelector('#colorInput')
let applyBtn = document.querySelector('.applyBtn')
let currentColorValue = document.querySelector('.currentColorValue')
let container = document.querySelector('.container')

const colorArray = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white', 'gray', 'cyan', 'magenta', 'lime', 'teal', 'indigo', 'violet', 'gold', 'silver', 'bronze', 'maroon', 'navy', 'olive', 'aqua', 'fuchsia', 'coral', 'salmon', 'khaki', 'plum', 'orchid', 'turquoise', 'lavender', 'peach', 'mint', 'cream', 'tan', 'beige', 'chocolate', 'crimson', 'ivory', 'jade']

const generateRandomColor = () => {
  const randomNumber = Math.floor(Math.random() * colorArray.length)
  return colorArray[randomNumber]
}
generateRandomColor()

let color = generateRandomColor();
console.log(color)

const handleRandomBtnClick = () => {
  let color = generateRandomColor();
  changeColor(color);
}

const handleApplyBtnClick = () => {
  const color = colorInput.value;
  changeColor(color);
}

const changeColor = (color) => {
  container.style.backgroundColor = color;
  currentColorValue.textContent = color;
}

randomBtn.addEventListener('click', handleRandomBtnClick) 
applyBtn.addEventListener('click', handleApplyBtnClick)
