var speaker = "Unselected";

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       
        let obj = JSON.parse(this.responseText); // This obj is now your object from your JSON file.

        let obj_keys;
        let random_selector;
        let current_data = [];

        // I'm going to limit the selection of quotes to five different characters from the show.
        // For now I'll be doing it from inside a loop and breaking out once it finds a quote from one of the five characters.
        let limit_check = false;
        let available_cast = ["Michael", "Dwight", "Angela", "Jim", "Pam"];
        while (limit_check == false) {

          obj_keys = Object.keys(obj);
          random_selector = obj_keys[Math.floor(Math.random() *obj_keys.length)];
          current_data = obj[random_selector];

          if (available_cast.includes(current_data["speaker"]) == true && current_data["line_text"].length > 10) {
            break;
          }
        }

        // Get the quote and the characer who said the quote
        let quote = current_data["line_text"];
        window.speaker = current_data["speaker"];

        // Send the quote into the HTML doc
        document.querySelector("#quote_output").innerHTML = `"${quote}"`;
      }
    };
    xhttp.open("GET", "theoffice_lines.json", true);
    xhttp.send();

}


function main() {

  // Run the function to fetch our JSON data
  loadDoc();
  
  console.log("Speaker is " + window.speaker);

  let btn_answer = document.querySelector("#button_answer");

  // Listen for click events from the profile buttons
  let btn_michael = document.querySelector("#face_michael");
  btn_michael.addEventListener('click', function() {
    btn_answer.value = "Michael";
  });

  let btn_dwight = document.querySelector("#face_dwight");
  btn_dwight.addEventListener('click', function() {
    btn_answer.value = "Dwight";
  });

  let btn_angela = document.querySelector("#face_angela");
  btn_angela.addEventListener('click', function() {
    btn_answer.value = "Angela";
  });

  let btn_jim = document.querySelector("#face_jim");
  btn_jim.addEventListener('click', function() {
    btn_answer.value = "Jim";
  });
  
  let btn_pam = document.querySelector("#face_pam");
  btn_pam.addEventListener('click', function() {
    btn_answer.value = "Pam";
  });

  btn_answer.addEventListener('click', function() {
    console.log("User Selected: " + btn_answer.value);

    if (speaker == btn_answer.value) {
      console.log("CORRECT!");
    } else {
      console.log("WRONG!");
    }
  });
}

window.onload = main;