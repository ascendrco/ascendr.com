(function($){
    // more button on homepage
    $('body').on('click', '#more', function (e) {
        e.preventDefault();
        // scroll down to content
        $('html, body').animate({
            scrollTop: $('.row.companies').offset().top
        }, 500);
    });
    // responsive menu
    $('body').on('click', '#menu', function (e) {
        e.preventDefault();
        var selector = $('#global_nav, #global_header');
        // hide or show nav
        if (selector.hasClass('active')) {
            selector.removeClass('active');
        } else {
            selector.addClass('active');
        }
    });
    $('body').on('submit', '#signup', function(e) {
        e.preventDefault();

        // remove error clases
        $('#signup input').removeClass('error');

        // if honey pot is full, we're done
        if ($('#honey').val() !== '') { return false; }

        // regex to test
        var emailRegex = new RegExp(/^[_a-z0-9_-]+(\.[_a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z]{2,4})+$/i);
        var charsRegex = new RegExp(/^([a-zA-Z0-9\/\\\_\-\.\,\(\)\:\;\$\!\s\']{1,100})$/);

        // array to handle erros
        var errArr = [];

        // array to hold values
        var values = {
            email: $('#email').val(),
            name: $('#name').val(),
            phone: $('#phone').val(),
            company: $('#company').val()
        };

        // loop through values
        $.each(values, function(key, value){
            // if email, test against email value
            if (key === 'email') {
                if (!emailRegex.test(value) || value.length === 0) {
                    errArr.push(key);
                    $('#' + key).addClass('error');
                }
            // otherwise just test values exist
            } else {
                if (!charsRegex.test(value) || value.length === 0) {
                    errArr.push(key);
                    $('#' + key).addClass('error');
                }
            }
        });

        if (errArr.length === 0) {
            $.ajax({
                url: 'https://stg-api.ascendr.com/marketing/try',
                jsonp: 'callback',
                dataType: 'jsonp',
                data: values,
                success: function( response ) {
                    $('#signup').hide()
                    $('#success').show()
                },
                error: function (jqXHR, textStats, err) {
                    console.log(jqXHR, textStats, err);
                }
            });
        }

    });
})(jQuery);
