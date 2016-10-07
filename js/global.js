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
        var selector = $("#global_nav, #global_header");
        // hide or show nav
        if (selector.hasClass('active')) {
            selector.removeClass('active');
        } else {
            selector.addClass('active');
        }
    });
})(jQuery);
