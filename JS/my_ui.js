$(document).ready(function (){
    $('#ui-meau').on('click', function () {
        $('.ui.sidebar')
            .sidebar('toggle')
            ;
    });

    $('#sidebar-home-a').on('click', function () {
        $('#home-tab-a').trigger('click'); 
    });

    $('#sidebar-about-a').on('click', function () {
        $('#about-tab-a').trigger('click');
    });

    $('#sidebar-resume-a').on('click', function () {
        $('#resume-tab-a').trigger('click');
    });

    $('#sidebar-gallery-a').on('click', function () {
        $('#gallery-tab-a').trigger('click');
    });

    $('#sidebar-music-a').on('click', function () {
        $('#music-tab-a').trigger('click');
    });

    $('#sidebar-project-a').on('click', function () {
        $('#project-tab-a').trigger('click');
    });

    $('#sidebar-contact-a').on('click', function () {
        $('#to-contact').trigger('click');
    });
});