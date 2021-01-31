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
  let available_cast = ["Michael", "Dwight", "Angela", "Jim", "Pam"];
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

  fetchJSONdata();
  document.querySelector("#button_answer").style.display = "block";
  document.querySelector("#button_next").style.display = "none";
  current_round+=1;
  document.querySelector("#current_round").innerHTML = current_round;
  document.querySelector("#answer_status").innerHTML = "";
  document.querySelector("#answer_name").innerHTML = "";
}


function main() {

  // Run the function to fetch our JSON data
  loadDoc();

  // Listen for click events from the profile buttons
  let btn_michael = document.querySelector("#face_michael");
  btn_michael.addEventListener('click', function() {
    user_selection = "Michael";
  });

  let btn_dwight = document.querySelector("#face_dwight");
  btn_dwight.addEventListener('click', function() {
    user_selection = "Dwight";
  });

  let btn_angela = document.querySelector("#face_angela");
  btn_angela.addEventListener('click', function() {
    user_selection = "Angela";
  });

  let btn_jim = document.querySelector("#face_jim");
  btn_jim.addEventListener('click', function() {
    user_selection = "Jim";
  });
  
  let btn_pam = document.querySelector("#face_pam");
  btn_pam.addEventListener('click', function() {
    user_selection = "Pam";
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