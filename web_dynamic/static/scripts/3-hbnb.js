$(document).ready(init);

function init() {
  const selectedAmenities = {};
  $(".amenities .popover input").change(function () {
    if ($(this).is(":checked")) {
      selectedAmenities[$(this).attr("data-name")] = $(this).attr("data-id");
    } else if ($(this).is(":not(:checked)")) {
      delete selectedAmenities[$(this).attr("data-name")];
    }
    const names = Object.keys(selectedAmenities);
    $(".amenities h4").text(names.sort().join(", "));
  });

  checkAPIStatus();
  searchPlaces();
}

function checkAPIStatus() {
  const url = "http://localhost:5001/api/v1/status/";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      $("#api_status").removeClass("available");
    });
}


function searchPlaces() {
    $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<article>
                  <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">${place.price_by_night}</div>
                  </div>
                  <div class="information">
                    <div class="max_guest">${place.max_guest} Guests</div>
                    <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
                </article>`
      }));
    }
  });
}

/*
This JavaScript code snippet uses jQuery to make an AJAX POST request to a backend server, 
and then dynamically renders HTML content based on the response. 
The code is a solution to the task of fetching data from an API 
and then using this data to populate a web page, replacing server-side rendering (like with Jinja templates) 
with client-side rendering. Here's a detailed breakdown of each part of the code and how it addresses the problem:

Code Breakdown
AJAX Request Setup:

type: 'POST': This specifies the method of the HTTP request as POST.
url: The endpoint (http://localhost:5001/api/v1/places_search) where the AJAX request is sent. 
This is the API that returns the data for "places".
data: '{}': Sends an empty JSON object as the body of the request. 
This matches the specification that the POST request should have an empty dictionary as its body.
dataType: 'json': Tells jQuery to expect JSON data in the response.
contentType: 'application/json': Sets the Content-Type header of the request to application/json, 
indicating that the body of the request is JSON.
Success Callback:

The success function is executed if the server responds successfully to the AJAX request. 
It receives data as its parameter, which should be an array of places, 
each represented as an object with properties like name, price_by_night, etc.
Inside the success function:
$('SECTION.places').append(...): This jQuery function selects the HTML element 
with the class places within a SECTION tag and appends new content to it.
data.map(place => {...}): The map function is used to transform each item in the data array into a string of HTML. 
Each place object is transformed into an <article> element that includes detailed information about the place.
The template literal inside the map function creates HTML that includes the place's name, price per night,
guest capacity, number of bedrooms, number of bathrooms, and a description.
How It Solves the Problem
Dynamic Content Loading: By fetching place data via AJAX from the frontend and using JavaScript 
to directly manipulate the DOM (Document Object Model), the page can display updated data without the need to reload. 
This enhances user experience by making the web application feel more responsive and interactive.
Client-side Rendering: Unlike traditional server-side rendering where HTML is generated on the server 
(as with Jinja templates in Flask), this approach generates HTML on the client. 
This can reduce server load and potentially decrease the time taken to display content 
since the browser doesn't need to reprocess the entire page HTML with each update.
Flexibility and Separation of Concerns: This method clearly separates 
the data fetching and processing (backend) from the presentation (frontend). 
It also provides more flexibility in handling the data, 
such as filtering or adjusting the displayed content without needing backend changes.
This code effectively addresses the problem of dynamically loading and 
displaying place data in a web application, shifting from server-side to client-side 
rendering which aligns with modern web development practices.
 */