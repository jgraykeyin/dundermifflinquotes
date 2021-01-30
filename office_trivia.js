function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       //Your code for what should happen when you get the json file should go here.
        let obj = JSON.parse(this.responseText); // This obj is now your object from your JSON file.
      }
    };
    xhttp.open("GET", "office_trivia.js", true);
    xhttp.send();
  }