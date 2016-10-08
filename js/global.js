// query string param getter
(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

(function($){

    var main = $('main.row');

    if (main.length) {
        main.css('height', $(window).height() - parseInt(main.css('padding-top'), 10) - parseInt(main.css('padding-bottom'), 10) );
    }


    // if query string and email field, set the field
    if ($.QueryString.email && $("#email").length) {
        // set value
        $("#email").val($.QueryString.email);
    }

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
        $('#signup .error-message').hide();
        $('#signup input, #signup label').removeClass('error');

        // if honey pot is full, we're done
        if ($('#honey').val() !== '') { return false; }

        // regex to test
        var emailRegex = new RegExp(/^[_a-z0-9_-]+(\.[_a-z0-9_-]+)*@[a-z0-9_-]+(\.[a-z0-9_-]+)*(\.[a-z]{2,4})+$/i);
        var charsRegex = new RegExp(/^([a-zA-Z0-9\/\\\_\-\.\,\(\)\:\;\$\!\s\']{1,100})$/);
        var phoneRegex = new RegExp(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);

        // array to handle errors
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
                    $('#' + key + ', label[for=' + key + ']').addClass('error');
                }
            // otherwise just test values exist
            } else if (key === 'phone') {
                if (!phoneRegex.test(value) || value.length === 0) {
                    errArr.push(key);
                    $('#' + key + ', label[for=' + key + ']').addClass('error');
                }
            } else {
                if (!charsRegex.test(value) || value.length === 0) {
                    errArr.push(key);
                    $('#' + key + ', label[for=' + key + ']').addClass('error');
                }
            }
        });

        if (errArr.length === 0) {
            $.ajax({
                url: 'https://stg-api.ascendr.com/marketing/try',
                jsonp: 'callback',
                dataType: 'jsonp',
                data: values,
                success: function(response) {
                    $('#signup').remove();
                    $('#success').show();
                },
                error: function (jqXHR, textStats, err) {
                    $("#signup .error-message").show();
                }
            });
        }

    });
})(jQuery);
