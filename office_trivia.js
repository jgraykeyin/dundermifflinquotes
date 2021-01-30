function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       //Your code for what should happen when you get the json file should go here.
        let obj = JSON.parse(this.responseText); // This obj is now your object from your JSON file.
        console.log("Testing output: ");
        //console.log(obj[1]);

        // Create a random value to grab an element from within the JSON data
        let obj_keys = Object.keys(obj);
        let random_selector = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        console.log(random_selector);

        // Get a line from the JSON.
        // TODO: Change this to a random line
        let current_data = obj[random_selector];

        // Get the quote and the characer who said the quote
        let quote = current_data["line_text"];
        let speaker = current_data["speaker"];

        // Test the output
        console.log(`Quote: ${quote}`);
        console.log(`Speaker: ${speaker}`);

        // Send the quote into the HTML doc
        document.querySelector("#quote_output").innerHTML = `"${quote}"`;
      }
    };
    xhttp.open("GET", "theoffice_lines.json", true);
    xhttp.send();


}

console.log("JS running?");

window.onload = loadDoc;