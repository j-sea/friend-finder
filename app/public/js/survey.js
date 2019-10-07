// Attach a submission event listener on the survey form
$('#survey-form').on('submit', function (jqueryEvent) {
    // Prevent the form from actually submitting
    jqueryEvent.preventDefault();

    // Make an AJAX post request on our API to submit our survey
    $.post(
        // Url to our API route for posting new survey taker info
        '/api/friends',
        // Grab our submitted form's data
        $(this).serialize(),
        // Set up a callback to run when the post request is done
        function (data) {
            // Set the name and photo to our best match's info
            $('#friend-name').text(data.name);
            $('#friend-image').attr('src', data.photo);

            // Fade in the modal containing our best match
            $('#friend-result').modal({
                fadeDuration: 100
            });
        }
    );
});
