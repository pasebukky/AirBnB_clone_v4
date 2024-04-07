$(document).ready(init);

function init () {
  const selectedAmenities = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      selectedAmenities[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete selectedAmenities[$(this).attr('data-name')];
    }
    const names = Object.keys(selectedAmenities);
    $('.amenities h4').text(names.sort().join(', '));
  });
}
