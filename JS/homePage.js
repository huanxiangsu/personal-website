var calender_site = false;
var prevScrollpos = $(document).scrollTop();

$(document).ready(function () {
    $('#main').fadeIn(2050);

    window.onscroll = function () {
        scrollTopBtnfading();
        scrollNavbar();
    };

    scrollToTop();
    scrollToContact();
    
    // update current time every second
    window.setInterval(updateCurrentTime, 1000);

    // add event listeners
    sidebar_displayAboutMe();
    sidebar_displayProjects();
    sidebar_displayCalender();
    displayGlobalModal();
    getResume();
    // getIntro();
    sendComment();
    autoScrollTab();
    homeScrollEffect();
    projectInitialization();

    // $(window).on('resize', function () {
    //     if (window.innerWidth < 930) {
    //         $('#myNavbar').collapse("hide");
    //     } else {
    //         $('#myNavbar').collapse("show");
    //     }
    // });
});


function sidebar_displayProjects() {
    // $('#side-project-id').on('click', function (event) {
    //     $('#myNav>li, .dropdown-menu>li').removeClass('active');
    //     $('.dropdown, #project-tab').addClass('active');
    //     $(this).tab('show');
        
    // });

    // $('#side-project-id').on('shown.bs.tab', function (event) {
    //     if (this.hash !== "") {
    //         event.preventDefault();
    //         var hash = this.hash;

    //         $('html, body').animate({
    //             scrollTop: $(hash).offset().top
    //         }, 200, function () {
    //             window.location.hash = hash;
    //         });
    //     }
    // });

    $('#side-project-id').on('click', function () {
        $('#project-tab-a').trigger('click');
    });
}


function sidebar_displayAboutMe() {
    // $('#side-about-id').on('click', function (event) {
    //     $('#myNav>li, .dropdown-menu>li').removeClass('active');
    //     $('#about-tab').addClass('active');
    //     $(this).tab('show');
    // });

    // $('#side-about-id').on('shown.bs.tab', function (event) {
    //     if (this.hash !== "") {
    //         event.preventDefault();
    //         var hash = this.hash;

    //         $('html, body').animate({
    //             scrollTop: $(hash).offset().top
    //         }, 'fast', function () {
    //             window.location.hash = hash;
    //         });
    //     }
    // });

    $('#side-about-id').on('click', function () {
        $('#about-tab-a').trigger('click'); 
    });
}


function updateCurrentTime() {
    $('#moment-time').text(moment().format('MMMM DD YYYY, hh:mm:ss A'));
}


function sidebar_displayCalender() {
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
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 300, function () {
                window.location.hash = hash;
            });
        }
    });
}


function scrollTopBtnfading() {
    if ($(document).scrollTop() > 100) {
        $('#scroll-top').fadeIn(800);
    } else {
        $('#scroll-top').fadeOut(800); 
    }
}

function scrollToTop() {
    $(".scroll-top-btn").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
}

function scrollNavbar() {
    var currentScrollPos = $(document).scrollTop();
    if (currentScrollPos > 13) {
        $('#my-nav').css('background-color', 'rgba(19, 36, 55, 0.95)');
    } else {
        $('#my-nav').css('background-color', 'rgba(19, 36, 55, 0.41)');
    }

    if (currentScrollPos > 55) {
        if (prevScrollpos > currentScrollPos) {
            $('#my-nav').css('top', '0');
        } else {
            $('#my-nav').css('top', '-55px');
        }
        prevScrollpos = currentScrollPos;
    } else {
        $('#my-nav').css('top', '0');
    }
}


function scrollToContact() {
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
}


function getResume() {
    $("#resume-tab-a").on('click', function () {
        if ($('#resume-block').text() == "") {
            $.ajax({
                "type": "POST",
                "url": './php/readData.php',
                "data": "data=resume",
                'success': function (data) {
                    $('#resume-block').append(data);
                },
                "error": function (xhr, status, error) {
                    if (xhr.status == '404') {
                        $('#resume-block').append("<h2 class='ajax-fail-text'>Resume File Not Found!</h2>");
                    } else {
                        $('#resume-block').append("<h2 class='ajax-fail-text'>Failed to Load Resume!</h2>");
                    }
                }
            });
        }
    });
}

/*
function getIntro() {
    $("#about-tab").on('click', function () {
        console.log('aa');
        if ($('#intro-block').text() == "") {
            $.ajax({
                "type": "POST",
                "url": './data/intro.html',
                'success': function (data) {
                    $('#intro-block').append(data);
                },
                "error": function (xhr, status, error) {
                    if (xhr.status == '404') {
                        $('#intro-block').append("<h2 class='fail-text'>Introduction File Not Found!</h2>");
                    } else {
                        console.log(xhr.status);
                        $('#intro-block').append("<h2 class='fail-text'>Failed to Load Introduction!</h2>");
                    }
                }
            });
        }
    });
}
*/

function sendComment() {
    $('#comment-send').on('click', function () {
        $.post("./php/comment.php",
            {
                "comment-name": $('#comment-name').val(),
                "comment-email": $('#comment-email').val(),
                "comment-area": $('#comment-area').val()
            },
            function (data, status) {
                console.log(status);
                $('#comment-response').text(data);
                $('#comment-response').css({
                    'visibility': 'visible',
                    'opacity': '1'
                });
                window.setTimeout(function () {
                    $('#comment-response').css({
                        'opacity': '0'
                    });
                    window.setTimeout(function () {
                        $('#comment-response').css({
                            'visibility': 'hidden'
                        });
                        $('#comment-response').text("");
                    }, 1000);
                }, 2500);
            }
        );
    });
}

function displayGlobalModal() {
    $('.home-img').on('click', function () {
        // $('.modal-img, #modal-img-caption, .modal-close-btn').removeClass('modal-zoom-out');
        var src = $(this).attr('src');
        var alt = $(this).attr('alt');
        $('#modal-img').attr('src', src);
        $('#modal-img').attr('alt', alt);
        $('#modal-img-caption').text(alt);
        $('#gallary-img-modal').modal();
        // $('.modal-img, #modal-img-caption, .modal-close-btn').css({ 'transform': 'scale(1)' });
        $('.modal-img, #modal-img-caption, .modal-close-btn').addClass('modal-zoom-in');
        // $('#gallary-img-modal').modal(); 
    });

    $('.modal-close-btn').on('click', function () {
        // $('.modal-img, #modal-img-caption, .modal-close-btn').css({ 'transform': 'scale(0)' });
        // $('.modal-img, #modal-img-caption, .modal-close-btn').removeClass('modal-zoom-in');
        $('.modal-img, #modal-img-caption, .modal-close-btn').addClass('modal-zoom-out');
        setTimeout(function () {
            $('#gallary-img-modal').modal('hide');
        }, 750);
    });

    $('#gallary-img-modal').on('shown.bs.modal', function () {
        $('.modal-img, #modal-img-caption, .modal-close-btn').removeClass('modal-zoom-in');
    });

    $('#gallary-img-modal').on('hidden.bs.modal', function () {
        $('.modal-img, #modal-img-caption, .modal-close-btn').removeClass('modal-zoom-out');
        // reset modal info to prevent slow internet.
        $('#modal-img').attr('src', '#');
        $('#modal-img').attr('alt', '#');
        $('#modal-img-caption').text('#');
    });
}


function autoScrollTab() {
    $('#about-tab-a').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 450, function () {
                window.location.hash = hash;
            });
        }
    });

    $('#resume-tab-a').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 450, function () {
                window.location.hash = hash;
            });
        }
    });

    $('#gallery-tab-a').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 450, function () {
                window.location.hash = hash;
            });
        }
    });

    $('#music-tab-a').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 450, function () {
                window.location.hash = hash;
            });
        }
    });

    $('#project-tab-a').on('shown.bs.tab', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var topHash = "#content-top1";
            $('html, body').animate({
                scrollTop: $(topHash).offset().top
            }, 450, function () {
                window.location.hash = hash;
            });
        }
    });
}


var homeScrollFlag = true;
function homeScrollEffect() {
    homeScroll();
    $('#home-tab-a').on('shown.bs.tab', function (event) {
        homeScrollFlag = true;
        homeScroll();
    });

    $('#home-tab-a').on('hidden.bs.tab', function () {
        homeScrollFlag = false;
        for (var i = 0; i < $('.home-row').length; ++i) {
            $('.home-row').eq(i).hide();
        }
    });

    $(document).on('scroll', function () {
        if (homeScrollFlag) {
            homeScroll();
        }
    });
}

function homeScroll() {
    var firstTop = $('#content-top').offset()['top'];
    var pageBottom = $(document).scrollTop() + $(window).height();

    if (pageBottom - firstTop >= 130) {
        $('.home-row').eq(0).show();
    }
    for (var i = 1; i < $('.home-row').length; ++i) {
        var offTop = $('.home-row').eq(i - 1).offset()['top'];
        var previousBottom = $('.home-row').eq(i - 1).height() + offTop;
        if (offTop > 0) {
            if (pageBottom - previousBottom >= 130) {
                // $('.home-row').eq(i).show();
                $('.home-row').eq(i).show();
            }
        } else {
            break;
        }     
    }
}

function projectInitialization() {
    // $('#project-tab-a').on('shown.bs.tab', loadProjectContent);
    loadProjectContent();
}

function loadProjectContent() {
    $.ajax({
        "type": "POST",
        "url": './php/readData.php',
        "data": 'data=project',
        'success': function (data) {
            setupProjectContent(JSON.parse(data));
            getProjects();
        },
        "error": function (xhr, status, error) {
            console.log("Project site Error: " + xhr.status);
        }
    });
    // $('#project-tab-a').off('shown.bs.tab', loadProjectContent);
}

function setupProjectContent(projectList) {
    var numRows = projectList.length;
    var a_row = '<div class="row project-row">\r';
    for (var i = 0; i < numRows; ++i) {
        let cur = projectList[i];
        a_row += '<div class="col-xs-6 col-sm-4 col-md-6 col-lg-4 project-wrapper">';
        a_row += '<div class="project-block">';
        
        // first block - img, title, description
        a_row += '<div>';
        a_row += '<div class="project-img">';
        if (cur.demo_link) {
            a_row += '<a href="' + cur.demo_link + '" target="_blank">';
        } else {
            a_row += '<a>';
        }
        a_row += '<img class="myimg img-responsive zoom-effect" src="' + cur.img + '">';
        a_row += '</a></div>';

        a_row += '<div class="project-body">';
        a_row += '<h3 class="project-body-title">' + cur.title + '</h3>';
        a_row += '<p class="project-body-content">' + cur.description + '</p>';
        a_row += '</div></div>';

        // second block - footer: details and demo button
        a_row += '<div class="project-body-footer clearfix">';
        if (cur.detail_link) {
            a_row += '<a class="project-body-footer-link" href="' + cur.detail_link + '" target="_blank"><button class="btn btn-primary" type="button">Details &gt;&gt;</button></a>\r';
        } else {
            a_row += '<a class = "project-body-footer-link" data-toggle="popover" title="No Detail" data-content="Detail not available" data-placement="bottom" data-trigger="hover"><button class="btn btn-primary" type="button">Details &gt;&gt;</button></a>';
        }
        if (cur.demo_link != null) {
            a_row += '<a class="project-body-footer-link" href="' + cur.demo_link + '" target="_blank"><button class="btn btn-danger" type="button">Demo &gt;&gt;</button></a>';
        } else {
            a_row += '<a class="project-body-footer-link" data-toggle="popover" title="No Demo" data-content="Demo not available" data-placement="bottom" data-trigger="hover"><button class="btn btn-danger" type="button">Demo &gt;&gt;</button></a>';
        }
        a_row += '</div></div></div>';
    }
    a_row += '</div>';
    $('#myProject').append(a_row);
    $('[data-toggle="popover"').popover();
}


function getProjects() {
    var projectList = $('.project-block');
    // console.log(projectList);
    if (projectList.length === 0) {
        $('.side-project-content').append('<p>None</p>');
        return;
    }
    
    let ul = $('<ul style="padding-left: 20px"></ul>');
    var len = projectList.length - 1;

    // add at most three projects to the side project content.
    for (var i = 0; i < 5; ++i) {
        if (len < 0) {
            return;
        }
        var p = projectList.eq(len).children().eq(0).children('.project-body').eq(0);
        var footer = projectList.eq(len).children('.project-body-footer').eq(0);
        var title = p.children('.project-body-title').eq(0).text();
        var content = p.children('.project-body-content').eq(0).text();
        var link = footer
            .children('.project-body-footer-link')
            .eq(0)
            .attr('href');
        // console.log(title + ' + ' + content + ' + ' + link);

        if (content.length > 51) {
            content = content.substr(0, 50) + '...';
        }
        var a = $('<a></a>');
        a.text('>> ' + title + ' - ' + content);
        a.attr({
            class: 'side-project-content-item',
            href: link,
            target: '_blank',
        });
        let li = $('<li></li>');
        li.append(a);
        ul.append(li);
        --len;
    }
    $('.side-project-content').append(ul);
}


// $(document).on('click', function (event) {
//     console.log(event.pageY); 
// });
