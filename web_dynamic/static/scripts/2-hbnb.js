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
