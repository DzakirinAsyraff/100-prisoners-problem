//const MAX is the number of boxes and prisoners, half of MAX is the max number of turns allowed
const MAX = 10;
let grid_container = document.querySelector(".box-container");
let autoplay_button = document.querySelector(".autoplay-button");
let start_button = document.querySelector(".start-button");
let prisoner_turn = document.querySelector(".prisoner-turn");
let game_round = document.querySelector(".game-round");
let show_loop = document.querySelector(".show-loop");
//box_item contains the array of divs with class "box-item"
let box_item=[];
//const box contains array of numbers from 1 to 40 (number on box)
const box = [];
//const value_inside_box contains array of numbers from 1 to 40 with randomized order (value inside box)
let value_inside_box = [];
//variable for turn
let turn = 0;
//variable for round
let round = 0;
function setup() {
  noCanvas();
  value_inside_box = randomNumber();
  createBoxes();
  console.log(value_inside_box);
  console.log(box);
  console.log(box_item);
}

//function below will create 40 div with class "box"
function createBoxes(){
  for(let i = 0; i < MAX; i++){
    box_item[i] = document.createElement("button");
    //add disabled attribute to the box
    box_item[i].setAttribute("disabled", "");
    //add text to each div
    box_item[i].innerHTML = i+1;
    //add class to each div
    box_item[i].className = "box-item";
    //add id to each div
    box_item[i].id = value_inside_box[i];
    //add div to the container
    grid_container.appendChild(box_item[i]);
    box.push(i+1);
    //add event listener to each div
    box_item[i].addEventListener("click", function(){click_box(i);});
    //give id to each div using random number function
    // box[i].id = randomNumber()[i];
  }
}

//function for remove box item from box container
function resetbox(){
  for(let i = 0; i < MAX; i++){
    grid_container.removeChild(box_item[i]);
  }
}

//function for click box
function click_box(i){
  box_item[i].classList.toggle("active");
  let box_id = box_item[i].id;
  let box_id_num = parseInt(box_id);
  box_item[i].innerHTML = box_id_num;
  check_box_id(box_id_num);
  round++;
  game_round.innerHTML = round;
}

//function for start button
function click_start(){
  remove_disabled();
  turn=1;
  prisoner_turn.innerHTML = turn;
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

//function for autoplay
function autoplay(){
  if(document.getElementById('random-mode').checked){
    randomMode();
    alert("random mode");
  }
  else if(document.getElementById('strategy-mode').checked){
    strategyMode();
    alert("strategy mode");
  }
  else{
    alert("please select mode");
  }
}
  //function for random mode
  function randomMode(){
  }

  //function for strategy mode
  function strategyMode(){
  }

  //function to check if the box id is equal to the turn
  function check_box_id(box_id){
    if(box_id==turn){
      let b = document.getElementById(box_id);
      b.classList.toggle("correct");
      alert("You guessed correctly!");
      next_turn();
    }
    else if(round>(MAX/2)){
      alert("You die!");
    }
  }

  //function for next turn when the box id is equal to the turn
  function next_turn(){
    resetbox();
    createBoxes();
    remove_disabled();
    turn++;
    round = 0;
    prisoner_turn.innerHTML = turn;
  }

  //function to remove attribute disabled from all boxes
  function remove_disabled(){
    for(let i = 0; i < box_item.length; i++){
      box_item[i].removeAttribute("disabled");
    }
  }

  /*
  function to calculate available loops by 
  1. starting with the first box
  2. check the box id
  3. look for the box id in the box array
  4. go to the next box
  5. repeat until the end of the box array
  */
  function calculate_available_loops(){
    let connection = [];
    for(let i=0; i<box.length; i++){
      connection.push([]);
    }
    for(let i=0; i<box.length; i++){
      for(let j=0; j<value_inside_box.length; j++){
        if(box[i]==value_inside_box[j]){
          connection[i].push(box[i]);
          connection[i].push(j+1);
        }
      }
    }
    console.log(connection);
    //using the connection array, calculate the available loops within the connection
    let available_loops = [];
    //available loop is a 2d array with the row as how many loops and the column as the loop
    if(connection[0][0]==connection[0][1]){

    }
    do{

    }while(i!=j)
    

    return available_loops;
  }

  //add event listener to autoplay button
  autoplay_button.addEventListener("click", autoplay);

  //add event listener to start button
  start_button.addEventListener("click", click_start);

  //add event listener to show loop button
  show_loop.addEventListener("click", function(){
    let loops = calculate_available_loops();
    console.log(loops);
  });