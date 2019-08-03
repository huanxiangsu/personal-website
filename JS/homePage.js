var img1 = 


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

    setupGallary();
    changeGallaryView();
    displayImgModal();
    
});







