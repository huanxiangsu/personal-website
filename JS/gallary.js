var currentCol = 0;
var totalCol = 3;
var totalCol3 = 0;
var is_view2 = false;
var custom_view_changed = false;
var global_view2 = false;

$(document).ready(function () {
    $('#gallery-tab-a').on('shown.bs.tab', mainSetupGallery);
});

function mainSetupGallery() {
    $.ajax({
        "type": "POST",
        "url": './php/readData.php',
        "data": 'data=gallery',
        'success': function (data) {
            setupGallary(JSON.parse(data));
            // changeGallaryView();
            displayModalInGallery();
        },
        "error": function (xhr, status, error) {
            console.log("Error: " + xhr.status);
            $('.gallary').css('height', '300px');
            $('.gallary').append('<h2 class="ajax-fail-text">Failed to Load Gallery!</h2>');
        }
    });
    $('#gallery-tab-a').off('shown.bs.tab', mainSetupGallery);
    
}


function setupGallary(imgList) {
    $('.gallary').append('<div class="gallary-col" id="gal-col-0"></div>');
    $('.gallary').append('<div class="gallary-col" id="gal-col-1"></div>');
    $('.gallary').append('<div class="gallary-col" id="gal-col-2"></div>');

    addAllImgToGallary(imgList);

    // add close botton to gallary image
    $('.gallary-img').append('<button class="close-btn" type="button" title="Close">x</button>');

    // remove img when clicked close btn
    $('.close-btn').on('click', function () {
        $(this).parent().remove();
    });

    addChangeGalleryView();

    autoAdjustViews();

    // auto change view on resize, no effect if user clicked custom views
    $(window).on('resize', function () {
        if (custom_view_changed === false) {
            autoAdjustViews();
        }
    });
}

// change gallery view based on window size.
function autoAdjustViews() {
    if ($(window).width() > 1200) {
        $('#lg3').trigger('click');
        custom_view_changed = false;

    } else if ($(window).width() >= 992 && $(window).width() <= 1200) {
        $('#lg2').trigger('click');
        custom_view_changed = false;

    } else if ($(window).width() > 767 && $(window).width() <= 991) {
        $('#lg3').trigger('click');
        custom_view_changed = false;

    } else if ($(window).width() >= 561 && $(window).width() <= 767) {
        $('#lg2').trigger('click');
        custom_view_changed = false;

    } else {
        $('#lg1').trigger('click');
        custom_view_changed = false;
    }
}

function addAllImgToGallary(imgList) {
    for (var i = 0; i < imgList.length; ++i) {
        addImgToGallary(imgList[i].src, imgList[i].alt);
    }
}

function addImgToGallary(src, alt) {
    var col = currentCol % totalCol;
    var anImg = '<div class="gallary-img ' + 'img-num-' + col + currentCol  + '">';
    anImg += '<img class="myimg img-responsive img-rounded zoom-rotate-effect" src="' + src + '" alt="' + alt + '">';
    anImg += '</div>';
    
    $('#gal-col-' + col).append(anImg);
    ++currentCol;
}


function addChangeGalleryView() {
    $('#lg1').on('click', function () {
        custom_view_changed = true;
        $('.gallary-col').css({ 'max-width': '100%', 'flex': '100%' });
        view2To13();
    });

    $('#lg2').on('click', function () {
        custom_view_changed = true;
        $('.gallary-col').css({ 'max-width': '50%', 'flex': '50%' });
        view13To2();
    });

    $('#lg3').on('click', function () {
        custom_view_changed = true;
        $('.gallary-col').css({ 'max-width': '33.3%', 'flex': '33.3%' });
        view2To13();
    });
}

function view2To13() {
    if (is_view2) {
        // console.log('now view13');
        for (var i = 0; i < totalCol3; ++i) {
            if (document.getElementById('pre-col-' + i)) {
                $('#gal-col-2').append($('#pre-col-' + i));
            }
        }
        is_view2 = false;
    }
}


function view13To2() {
    if (!is_view2) {
        // console.log('now view2');
        var children = $('#gal-col-2').children();
        var len = children.length;
        totalCol3 = len;

        for (var i = 0; i < len; i += 2) {
            children.eq(i).attr('id', 'pre-col-' + i);

            if ($('#gal-col-0').children().length < $('#gal-col-1').children().length) {
                $('#gal-col-0').append(children.eq(i));
            } else {
                $('#gal-col-1').append(children.eq(i));
            }
            
            if (i + 1 < len) {
                var ii = i + 1;
                children.eq(i + 1).attr('id', 'pre-col-' + ii);
                if ($('#gal-col-0').children().length < $('#gal-col-1').children().length) {
                    $('#gal-col-0').append(children.eq(i + 1));
                } else {
                    $('#gal-col-1').append(children.eq(i + 1));
                }
            }
        }
        is_view2 = true;
    }
}


function displayModalInGallery() {
    $('.gallary-img').on('click', function () {
        var img = $(this).find('img').eq(0);
        var src = img.attr('src');
        var alt = img.attr('alt');
        if (img !== undefined) {
            $('#modal-img').attr('src', src);
            $('#modal-img').attr('alt', alt);
            $('#modal-img-caption').text(alt);
            $('#gallary-img-modal').modal();
            // $('.modal-img, #modal-img-caption, .modal-close-btn').css({ 'transform': 'scale(1)' });
            $('.modal-img, #modal-img-caption, .modal-close-btn').addClass('modal-zoom-in');
            // $('#gallary-img-modal').modal();
        } else {
            console.log('Error! Cannot find image source!');
        }
    });
}