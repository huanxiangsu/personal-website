var calender_site = false;

$(document).ready(function () {
    // $('body').scrollspy({ target: "#to-contect, #side-calender-id", offset: 50 });

    window.onscroll = function () {
        scroll();
    };
    scrollToTop();

    $("#to-contact").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function () {
                window.location.hash = hash;
            });
        }
    });

    $('[data-toggle="popover"').popover();

    


    window.setInterval(updateCurrentTime, 1000);

    displayAboutMe();
    getProjects();
    displayProjects();

    displayCalender();

    setupGallary();
    changeGallaryView();
    displayImgModal();

    getResume();
    
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


function displayProjects() {
    $('#side-project-id').on('click', function (event) {
        $('#myNav>li, .dropdown-menu>li').removeClass('active');
        $('.dropdown, #project-tab').addClass('active');
        
        $(this).tab('show');
        
    });

    $('#side-project-id').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 200, function () {
                window.location.hash = hash;
            });
        }
    });
}


function displayAboutMe() {
    $('#side-about-id').on('click', function (event) {
        $('#myNav>li, .dropdown-menu>li').removeClass('active');
        $('#about-tab').addClass('active');
        $(this).tab('show');
    });

    $('#side-about-id').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 'fast', function () {
                window.location.hash = hash;
            });
        }
    });
}


function updateCurrentTime() {
    $('#moment-time').text(moment().format('MMMM DD YYYY, hh:mm:ss A'));
}


function displayCalender() {
    $('#side-calender-id').on('click', function (event) {
        $('#myNav>li, .dropdown-menu>li').removeClass('active');
        if (!calender_site) {
            var cal = '<iframe id="site-calender" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23039BE5&amp;ctz=America%2FLos_Angeles&amp;src=eGlhbmc2MjU3NjQ1NjNAZ21haWwuY29t&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%237986CB&amp;color=%2333B679&amp;color=%230B8043&amp;showTitle=0&amp;showTabs=1&amp;showCalendars=1" style="border-width:0" width="100%" height="600" frameborder="0" scrolling="yes"></iframe>';
            $('#myCalender').append(cal);
            calender_site = true;
        }

        $(this).tab('show');
        

    });

    $('#side-calender-id').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 300, function () {
                window.location.hash = hash;
            });
        }
    });
}


function scroll() {
    if ($(document).scrollTop() > 100) {
        $('#scroll-top').fadeIn(1300);
    } else {
        $('#scroll-top').fadeOut(1300); 
    }
}

function scrollToTop() {
    $(".scroll-top-btn").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
}


function getResume() {
    $("#resume-tab").on('click', function () {
        if ($('#resume-block').text() == "") {
            $.ajax({
                "type": "POST",
                "url": './data/resume.html',
                'success': function (data) {
                    $('#resume-block').append(data);
                },
                "error": function (xhr, status, error) {
                    if (xhr.status == '404') {
                        $('#resume-block').append("<h1>Resume File Not Found!</h1>");
                    } else {
                        $('#resume-block').append("<h1>Failed to Load Resume!</h1>");
                    }
                }
            });
        }
    });
}










