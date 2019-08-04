
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

    $('#side-about-id').on('click', function () {
        $('#myNav>li, .dropdown-menu>li').removeClass('active');
        $('#about-tab').addClass('active');  
    });

    $('#side-project-id').on('click', function () {
        $('#myNav>li, .dropdown-menu>li').removeClass('active');
        $('.dropdown, #project-tab').addClass('active');
    });

    setupGallary();
    changeGallaryView();
    displayImgModal();

    getProjects();
    
});

function getProjects() {
    var projectList = $('.project-body');
    // console.log(projectList);
    if (projectList.length === 0) {
        $('.side-project-content').append('<h5>None</h5>');
        return;
    }
    var len = projectList.length - 1;

    // add at most three projects to the side project content.

    for (var i = 0; i < 3; ++i) {
        if (len < 0) {
            return;
        }
        var p = projectList.eq(len);
        var title = p.children('.project-body-title').eq(0).text();
        var content = p.children('.project-body-content').eq(0).text();
        var link = p.children('.project-body-footer').eq(0)
            .children('.project-body-footer-detail').eq(0)
            .attr('href');
        // console.log(title + ' + ' + content + ' + ' + link);

        var a = $("<a></a>");
        a.text('>> ' + title + ' - ' + content);
        a.attr({
            'class': 'side-project-content-item',
            'href': link,
            'target': '_blank',
        });
        $('.side-project-content').append(a);
        --len;
    }
}







