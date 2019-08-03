var img1 = 'images/s2.jpg';
var img2 = 'images/s3.jpg';
var img3 = 'images/s4.jpg';
var img4 = 'images/s5.jpeg';
var img5 = 'images/z2.jpg';
var img6 = 'images/s8.jpg';
var img7 = 'images/s9.jpg';
var img8 = 'images/s10.jpg';
var img9 = 'images/s6.jpeg';
var img10 = 'images/s12.jpeg';
var img11 = 'images/s10.jpg';
var img12 = 'images/s11.jpg';
var img13 = 'images/s13.jpg';
var img14 = 'images/p9.jpg';
var img15 = 'images/p3.jpg';

var currentCol = 0;
var totalCol = 3;

function setupGallary() {
    $('.gallary').append('<div class="gallary-col" id="gal-col-0"></div>');
    $('.gallary').append('<div class="gallary-col" id="gal-col-1"></div>');
    $('.gallary').append('<div class="gallary-col" id="gal-col-2"></div>');

    addAllImgToGallary();

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

function addImgToGallary(img) {
    var col = currentCol % totalCol;
    var anImg = '<div class="gallary-img">';
    anImg += '<img class="myimg img-responsive img-rounded zoom-rotate-effect" src="' + img + '">';
    anImg += '</div>';
    $('#gal-col-' + col).append(anImg);
    ++currentCol;
}

function addAllImgToGallary() {
    addImgToGallary(img1);
    addImgToGallary(img2);
    addImgToGallary(img3);
    addImgToGallary(img4);
    addImgToGallary(img5);
    addImgToGallary(img6);
    addImgToGallary(img7);
    addImgToGallary(img8);
    addImgToGallary(img9);
    addImgToGallary(img10);
    addImgToGallary(img11);
    addImgToGallary(img12);
    addImgToGallary(img13);
    addImgToGallary(img14);
    addImgToGallary(img15);
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
        var img = $(this).find('img').eq(0).attr('src');
        if (img !== undefined) {
            $('#modal-img').attr('src', img);
            $('#gallary-img-modal').modal();
        } else {
            console.log('Error! Cannot find image source!');
        }
    });
}