$(document).ready(function () {
    $('#login-button').click(function (event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        $.getJSON('users.json', function (data) {
            var userFound = false;
            var isAdmin = false;

            $.each(data, function (key, user) {
                if (user.username === username && user.password === password) {
                    userFound = true;
                    isAdmin = user.isAdmin;
                    return false; // Break out of the $.each loop
                }
            });

            if (userFound) {
                if (isAdmin) {

                    // Link to the admin page goes here
                    window.location.href = 'adminView.html';
                } else {

                    // Link to the user home page goes here
                    window.location.href = 'userHome.html';
                }
            } else {
                alert('Invalid username or password.');
            }
        });
    });
});