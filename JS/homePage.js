$("#searchBtn").on("click", function () {
    $("#topSearch").fadeToggle(300, function () {
        if ($('#searchIcon').hasClass('glyphicon-search')) {
            $('#searchIcon').removeClass('glyphicon-search');
            $('#searchIcon').addClass('glyphicon-remove');
        } else {
            $('#searchIcon').removeClass('glyphicon-remove');
            $('#searchIcon').addClass('glyphicon-search');
        }
    });
});

$(document).ready(function () {
    $('body').scrollspy({ target: "#to-contect", offset: 50 });
    $('[data-toggle="popover"').popover();
});


// $('#dropdown').on("mouseenter", function () {
//     $('.dropdown-menu').slideToggle(200);
    
// });

// $('#dropdown').on("mouseleave", function () {
//     $('.dropdown-menu').slideToggle(200);
// });




