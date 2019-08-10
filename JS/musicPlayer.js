var initial_btn_width = 9.89062;
var slider_min = 9.89062;
var slider_max = 366.297;
var bar_min = 0;
var bar_max = 356.391;
var is_moving = false;  // is mouse moving over progress bar

$(document).ready(function () {
    // initial_btn_width = parseFloat($('#slider-btn').css('left'));
    setupMusicPlayer();
});


function setupMusicPlayer() {
    playMusic();
    openPlayList();
    increment();
    progress_movement();
}


function openPlayList() {
    $('#list-btn').on('click', function () {
        $('.playlist-block').slideToggle(500);
    });
}

function playMusic() {
    $('#play-btn').on('click', function () {
        $(this).hide();
        $('#pause-btn').css({
            'display': 'inline-block'
        });
        $('.music-img').css({
            'animation-play-state': 'running'
        })
    });

    $('#pause-btn').on('click', function () {
        $(this).hide();
        $('#play-btn').css({
            'display': 'inline-block'
        });
        $('.music-img').css({
            'animation-play-state': 'paused'
        })
    });
}

function increment() {
    $('#next-btn').on('click', function () {
        var full_width = parseFloat( $('#bar-empty').css('width'));
        var ten = full_width / 10;
        var current_width = parseFloat( $('#bar-moving').css('width'));
        current_width += ten;
        current_width = current_width / full_width * 0.9 * 100;
        current_width = current_width + '%';

        var btn_current_width = parseFloat($('#slider-btn').css('left'));
        btn_current_width += ten;

        $('#bar-moving').css('width', current_width);
        $('#slider-btn').css('left', btn_current_width + 'px');
    });
}

function progress_movement() {
    $('#bar-empty').on('click', function (event) {
        var bar_width = event.pageX - $(this).offset().left;
        var full_width = parseFloat($('#bar-empty').css('width'));
        // bar_width = bar_width / full_width * 0.9 * 100;
        $('#bar-moving').css('width', bar_width + 'px');
        var slider_width = bar_width + initial_btn_width;
        $('#slider-btn').css('left', slider_width + 'px');

        console.log(bar_width);
        console.log(full_width);
        console.log(slider_width);
    });

    $('#slider-btn').on('mousedown', function (event) {
        is_moving = true;
    });

    $('#slider-btn').on('mouseup', function (event) {
        is_moving = false;
    });
    $('*').on('mouseup', function () {
        is_moving = false; 
    });

    $('.progress-music').on('mousemove', function (event) {
        if (is_moving) {
            console.log(event.clientX);
            console.log(event.pageX);
            console.log(window.innerWidth);
            console.log('--------------------');

            var bar_width = event.pageX - $('#bar-moving').offset().left;
            var slider_width = initial_btn_width + bar_width;
            if (bar_width >= bar_min && bar_width <= bar_max) {
                $('#bar-moving').css('width', bar_width + 'px');  
                $('#slider-btn').css('left', slider_width + 'px');
            }

        }
    });
}


