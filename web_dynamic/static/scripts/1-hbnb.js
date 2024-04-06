$(document).ready(function() {
    let amenityNames = [];

    $('.amenities input[type="checkbox"]').change(function() {
        let amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenityNames.push(amenityName);
        } else {
            amenityNames = amenityNames.filter(function(item) {
                return item !== amenityName;
            });
        }

        // Update the <h4> tag with the list of checked amenities as a sentence with commas
        let amenitiesList = amenityNames.join(', ');
        $('.amenities h4').text(amenitiesList);
    });
});
