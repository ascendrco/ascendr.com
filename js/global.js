(function($){
    // more button on homepage
    $("body").on('click', '#more', function (e) {
        e.preventDefault();
        // scroll down to content
        $('html, body').animate({
            scrollTop: $('.row.companies').offset().top
        }, 500);
    });
})(jQuery);
