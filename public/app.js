

    $.ajax({
      method: "POST",
      url: "/scrape"
  });

// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<img src = '" + data[i].image + "'> <h1><a href=https://www.kqed.org" + data[i].link + ">" + data[i].title + "</a></h1>"+ data[i].excerpt + "</p><br />");
      
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "p", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<form><div class= 'form-group'><input type='email' id='titleinput' name='title' class='form-control' id='exampleInputEmail1' placeholder='Name'>");
        // A textarea to add a new note body
        $("#notes").append("<div class='form-group'><textarea class='form-control' id='bodyinput' name='body' id='exampleFormControlTextarea1' rows='5'></textarea></div>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button type= 'button' class = 'btn btn-warning' data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
      
          $("#comments").empty();
          $("#comments").append(data.note.title);
          $("#comments").append(data.note.body);
          
        } else{
          $("#comments").empty();
          $("#comments").append("<h3> No Comments Yet! </h3>")
        }
      });
  });

  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  