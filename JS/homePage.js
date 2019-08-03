

$(document).ready(function () {
    $('body').scrollspy({ target: "#to-contect", offset: 50 });

    $("#to-contact").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
       } 
    });

    $('[data-toggle="popover"').popover();

    // add close botton to gallary image
    $('.gallary-img').append('<button class="close-btn" type="button" title="Close">x</button>');

    $('.close-btn').on('click', function () {
        $(this).parent().remove();
    });
});


function gallary() {

}




