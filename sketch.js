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
    let linker = [];
    for(let i=0; i<box.length; i++){
      connection.push({x:null, y:null});
      linker.push([]);
    }
    for(let i=0; i<box.length; i++){
      for(let j=0; j<value_inside_box.length; j++){
        if(box[i]==(j+1)){
          connection[i].x = box[i];
          linker[i].push(box[i]);
          connection[i].y = value_inside_box[j];
          linker[i].push(value_inside_box[j]);
        }
      }
    }

    
    //sort the connection array by y
    let rconnection = [...connection];
    rconnection.sort(function(a, b){
      return a.y - b.y;
    });
    
    //console.log(connection);
    //console.log(rconnection);
    console.log(linker);
    //using the connection array, calculate the available loops within the connection
    
    return connection;
  }

function linearSearch(arr, key){
  for(let i = 0; i < arr.length; i++){
      if(arr[i] === key){
        return i;
      }
  }
  return -1;
}

function linearSearchSpecial(arr, key){
  for(let i = 1; i < arr.length; i++){
      if(arr[i] === key){
          return i;
      }
  }
  return -1;
}

  function find_loops(connection){
    let connection_copy = [...connection];
    //to splice and used as while condition

    let available_loops = [];
    let l=0; //l is the index for connection array
    let m=0; //m is the index for outer array available_loops
    let n=0;
    // let count; 
    // let temp1;
    // let temp2;
    let next;
    //available loop is a 2d array with the row as how many loops and the column as the loop
    do{
      // available_loops[l] = [];
      
      for(let i=0; i<connection.length; i++){
        let temp1 = connection[i].x;//1(x)
        let temp2 = connection[i].y;//5(y)
        next = connection[i].y;
        
        available_loops[m] = temp1;
        m++;
        available_loops[m] = temp2;
        m++;
        connection_copy.splice(i, 1);
        
        while(temp1 !== next){//problem here
          let f = linearSearch(box, next);
          
          next = connection[f].y;
          available_loops[m] = next;
          m++;
          connection_copy.splice(f, 1);
          if(temp1 === next){
            break;
          }
        }
      }
      m=0;
      l++;
    }while(connection_copy.length>0);

    let loop_copy = [...available_loops];
    let loop_list = [];
    //copy the first loop in the available_loops array to a new array
    let i=0;
    let index=1;
    do{
      
      let last;
      do{
        last = linearSearchSpecial(available_loops,index);
        
        if(last===-1){
          index++;
          if(index>10){
            index=0;
          }
          
        }
      }while(last===-1);
      
      let new_loop = available_loops.slice(loop_list.length,last+1);
      console.log(new_loop);
      console.log(loop_list.length, last+1);
      loop_list.push(new_loop);
      console.log(loop_list);
      available_loops.splice(0,new_loop.length);
      console.log(available_loops);
      

      //if available_loops includes loop_list, remove it from available_loops
      for(let j=0; j< new_loop.length; j++){
        
        for(let k=0; k<available_loops.length; k++){
          
          if(available_loops[k]===new_loop[j]){
            
            available_loops.splice(k,1);
          }
        }
      }
      index++;
      
        
    }while(loop_list.length<30);

    //console.log(last);
    console.log(loop_list);
    console.log(available_loops);
    
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
    let floops = find_loops(loops);
    console.log(floops);
  });