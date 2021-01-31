var speaker = "Unselected";
var user_selection = "";
var current_round=1;
var score_correct=0;
var obj;


function fetchJSONdata() {
  let obj_keys;
  let random_selector;
  let current_data = [];

  let limit_check = false;

  
  // Setting up a list of the main cast members to choose from
  let full_cast = ["Michael", "Jim", "Pam", "Dwight", "Angela", "Kelly", "Ryan", "Kevin", "Andy", "Meredith","Oscar","Phyllis", "Creed", "Stanley", "Toby", "Erin", "Darryl", "Jan", "Gabe"]

  // Choose 5 random cast members for trivia round
  let available_cast = [];
  let x=1;
  let n=0;
  let dupes = [];
  let dice_roll = true;
  while (x < 6) {
  
    while (dice_roll == true) {
      n = Math.floor(Math.random() *full_cast.length);

      if (dupes.includes(n) == false) {
        dupes.push(n);
        break;
      }
    }
    
    available_cast.push(full_cast[n]);

    document.querySelector(`#face-${x}`).value = full_cast[n];
    document.querySelector(`#face-${x}`).style.backgroundImage = `url('images/profile_${full_cast[n].toLowerCase()}.png')`;

    x+=1;
  }
  // console.log(available_cast);
  
  
  // let available_cast = ["Michael", "Dwight", "Angela", "Jim", "Pam"];

  while (limit_check == false) {

    obj_keys = Object.keys(obj);
    random_selector = obj_keys[Math.floor(Math.random() *obj_keys.length)];
    current_data = obj[random_selector];

    if (available_cast.includes(current_data["speaker"]) == true && current_data["line_text"].length > 18) {
      break;
    }
  }

  // Get the quote and the characer who said the quote
  let quote = current_data["line_text"];
  speaker = current_data["speaker"];

  // Send the quote into the HTML doc
  document.querySelector("#quote_output").innerHTML = `"${quote}"`;
}


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        obj = JSON.parse(this.responseText); // This obj is now your object from your JSON file.

        fetchJSONdata();
      }
    };
    xhttp.open("GET", "theoffice_lines.json", true);
    xhttp.send();

}

function nextRound() {
  // This function sets up a new round, it should clear selections and add the Answer button back after it grabs a new trivia quote
  fetchJSONdata();
  document.querySelector("#button_answer").style.display = "block";
  document.querySelector("#button_next").style.display = "none";
  current_round+=1;
  document.querySelector("#current_round").innerHTML = current_round;
  document.querySelector("#answer_status").innerHTML = "";
  document.querySelector("#answer_name").innerHTML = "";
  user_selection="";
}


function main() {

  // Run the function to fetch our JSON data
  loadDoc();

  // Listen for click events from the profile buttons
  let btn_one = document.querySelector("#face-1");
  btn_one.addEventListener('click', function() {
    user_selection = btn_one.value;
  });

  let btn_two = document.querySelector("#face-2");
  btn_two.addEventListener('click', function() {
    user_selection = btn_two.value;
  });

  let btn_three = document.querySelector("#face-3");
  btn_three.addEventListener('click', function() {
    user_selection = btn_three.value;
  });

  let btn_four = document.querySelector("#face-4");
  btn_four.addEventListener('click', function() {
    user_selection = btn_four.value;
  });
  
  let btn_five = document.querySelector("#face-5");
  btn_five.addEventListener('click', function() {
    user_selection = btn_five.value;
  });

  let btn_next = document.querySelector("#button_next");
  btn_next.addEventListener('click', function() {
    nextRound();
  });

  let btn_answer = document.querySelector("#button_answer");
  btn_answer.addEventListener('click', function() {

    btn_next.style.display = "block";    
    btn_answer.style.display = "none";

    if (speaker == user_selection) {
      console.log("CORRECT!");
      document.querySelector("#answer_status").innerHTML = "Correct!";
      score_correct += 1;
      document.querySelector("#correct").innerHTML = score_correct;
    } else {
      console.log("WRONG!");
      document.querySelector("#answer_status").innerHTML = "Wrong!";
    }
    document.querySelector("#answer_name").innerHTML = `It was ${speaker}.`;
  });
}

window.onload = main;