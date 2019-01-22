

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
  

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })

      .then(function(data) {
        console.log(data);

        $("#notes").append("<h2>" + data.title + "</h2>");
   
        $("#notes").append("<form><div class= 'form-group'><input type='email' id='titleinput' name='title' class='form-control' id='exampleInputEmail1' placeholder='Name'>");

        $("#notes").append("<div class='form-group'><textarea class='form-control' id='bodyinput' name='body' id='exampleFormControlTextarea1' rows='5'></textarea></div>");
     
        $("#notes").append("<button type= 'button' class = 'btn btn-warning' data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        
        if (data.note) {

          $("#comments").empty();
          $("#comments").append('<h4>' + data.note.title + '</h4>');
          $("#comments").append('<p>' + data.note.body+ '</p>');

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
  