const MAX = 40;
let grid_container = document.querySelector(".box-container");
const box = [];
let value_inside_box = [];
function setup() {
  noCanvas();
  value_inside_box = randomNumber();
  createBoxes();
  console.log(value_inside_box);
  console.log(box);
}

//function below will create 40 div with class "box"
function createBoxes(){
  for(let i = 0; i < MAX; i++){
    let div = document.createElement("div");
    //add text to each div
    div.innerHTML = i+1;
    //add class to each div
    div.className = "box-item";
    //add id to each div
    div.id = value_inside_box[i];
    //add div to the container
    grid_container.appendChild(div);
    box.push(div);
    //give id to each div using random number function
    // box[i].id = randomNumber()[i];
  }
}

//this function will create an array of non-repeating random numbers from 1 to 40
function randomNumber(){
  let random = [];
  for(let i = 0; i < MAX; i++){
    let num = Math.floor(Math.random() * MAX) + 1;
    if(random.includes(num)){
      i--;
    }
    else{
      random.push(num);
    }
  }
  return random;
}