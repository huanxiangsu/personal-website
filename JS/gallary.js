var currentCol = 0;
var totalCol = 3;

$(document).ready(function () {
    $.ajax({
        "type": "POST",
        "url": './data/gallary.json',
        'success': function (data) {
            // setupGallary(data);
            setupGallary(data);
            changeGallaryView();
            displayImgModal();
        },
        "error": function (xhr, status, error) {
            console.log("Error: " + xhr.status);
        }
    });
});


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

    // $('.gallary').css({ 'opacity': '1' });
    // $('#gallary-tab').on('click', function () {
    //     $('.gallary').css({ 'opacity': '1' });
    // });
}

function setupGallary1(imgList) {
    for (var i = 0; i < imgList.length; ++i) {
        var src = imgList[i].src;
        var alt = imgList[i].alt
        var anImg = '<div class="gallary-col">';
        anImg += '<div class="gallary-img">';
        anImg += '<img class="myimg img-responsive img-rounded zoom-rotate-effect" src="' + src + '" alt="' + alt + '">';
        anImg += '</div>';
        anImg += '</div>';
        $('.gallary').append(anImg);
    }

    // add close botton to gallary image
    $('.gallary-img').append('<button class="close-btn" type="button" title="Close">x</button>');

    // remove img when clicked close btn
    $('.close-btn').on('click', function () {
        $(this).parent().remove();
    });
}

function addImgToGallary(src, alt) {
    var col = currentCol % totalCol;
    var anImg = '<div class="gallary-img">';
    anImg += '<img class="myimg img-responsive img-rounded zoom-rotate-effect" src="' + src + '" alt="' + alt + '">';
    anImg += '</div>';
    $('#gal-col-' + col).append(anImg);
    ++currentCol;
}

function addAllImgToGallary(imgList) {
    for (var i = 0; i < imgList.length; ++i) {
        addImgToGallary(imgList[i].src, imgList[i].alt);
    }
}

function changeGallaryView() {
    $('#lg1').on('click', function () {
        $('.gallary-col').css({ 'max-width': '100%', 'flex': '100%' });
    });
    $('#lg2').on('click', function () {
        $('.gallary-col').css({ 'max-width': '50%', 'flex': '50%' });
    });
    $('#lg3').on('click', function () {
        $('.gallary-col').css({ 'max-width': '33.3%', 'flex': '33.3%' });
    });
}


function displayImgModal() {
    $('.gallary-img').on('click', function () {
        var img = $(this).find('img').eq(0);
        var src = img.attr('src');
        var alt = img.attr('alt');
        if (img !== undefined) {
            $('#modal-img').attr('src', src);
            $('#modal-img').attr('alt', alt);
            $('#modal-img-caption').text(alt);
            $('#gallary-img-modal').modal();
        } else {
            console.log('Error! Cannot find image source!');
        }
    });
}